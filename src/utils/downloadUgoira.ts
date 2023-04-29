import AdmZip from 'adm-zip';
import { BitmapImage, GifCodec, GifFrame, JimpBitmap } from 'gifwrap';
import { ClientRequest } from 'node:http';
import https from 'node:https';
import os from 'node:os';
import { Worker } from 'node:worker_threads';
import { Ugoira } from '../api/types/Ugoira';
import { httpRequest } from '../helpers';
import { FileDownload } from './fileDownload';

/**
 * Downloads and encodes Ugoira.
 * @param ugoira Ugoira detail object
 * @param threads Number of Worker threads to quantize GIF frames
 * @example
 * import fs from 'node:fs';
 * import os from 'node:os'
 * const threads = os.cpus().length;
 * const client = await PixivApiClient.create({ userId, password });
 * const illustDetail = await client.Illust.detail('<illustId>');
 * if (illustDetail.illust.type === 'ugoira') {
 * 	const ugoira = await client.Ugoira.metadata('<illustId>');
 * 	const { metadata, data } = await Utils.downloadUgoira(ugoira, threads);
 * 	fs.writeFileSync(`${metadata.fileName}.${metadata.fileExtension}`, data);
 * }
 * @returns Promise<FileDownload>
 */
export async function downloadUgoira(
	ugoira: Ugoira,
	options = { threads: 4 },
): Promise<FileDownload> {
	const link = ugoira.ugoiraMetadata.zipUrls.medium;

	const headRequest: ClientRequest = https.request(new URL(link));
	headRequest.method = 'HEAD';
	headRequest.setHeader('Referer', 'https://www.pixiv.net/');
	const contentLengthPromise = new Promise((resolve, reject) =>
		headRequest.on('response', (response) => {
			const contentLength = response.headers['content-length'];
			const contentLengthNum = Number(contentLength);
			if (!isNaN(contentLengthNum)) {
				resolve(contentLengthNum);
			}
			reject('Bad content length');
		}),
	);

	await httpRequest(headRequest);
	const contentLength = await contentLengthPromise;

	const request: ClientRequest = https.request(new URL(link));
	request.setHeader('Referer', 'https://www.pixiv.net/');
	request.setHeader('Range', `bytes=0-${contentLength}`);

	const metadataPromise = new Promise<FileDownload['metadata']>(
		(resolve, reject) => {
			request.on('response', (response) => {
				const { protocol, host, path } = request;
				const { pathname } = new URL(protocol + host + path);
				const fileNameWithExtension = pathname.split('/').slice(-1)[0];
				const [fileName, fileExtension] = fileNameWithExtension.split('.');

				resolve({
					mimeType: response.headers['content-type'] ?? '',
					size: Number(response.headers['content-length']),
					fileName,
					fileExtension,
				});
			});
			request.on('error', (err) => {
				reject(`Error: ${err.message}`);
			});
		},
	);

	const gifZipBuffer = await httpRequest<Buffer>(request);
	const zip = new AdmZip(gifZipBuffer);
	const frameFiles = zip.getEntries();

	const frameBitmaps = frameFiles.map((f) => f.getData());

	const bitmaps: JimpBitmap[] = [];
	const cpus = os.cpus().length;

	const { threads } = options;
	const workerThreads =
		threads > 0
			? threads > cpus
				? cpus
				: threads
			: cpus > 4
			? 4
			: Math.min(cpus, 4);

	const gifFrames = await new Promise<GifFrame[]>((resolve) => {
		const workers: Worker[] = [];
		for (let i = 0; i < workerThreads; i++) {
			const startIndex = Math.floor((i / workerThreads) * frameBitmaps.length);
			const endIndex = Math.floor(
				((i + 1) / workerThreads) * frameBitmaps.length,
			);
			const framesBuffers = frameBitmaps.slice(startIndex, endIndex);
			const worker = new Worker(
				`${__dirname}/workers/quantizeGifBitmapWorker.js`,
				{
					workerData: {
						startIndex,
						framesBuffers,
					},
				},
			);
			worker.on(
				'message',
				({ id, bitmap }: { id: number; bitmap: JimpBitmap }) => {
					// Deserialize to Buffer
					bitmap.data = Buffer.from(bitmap.data);
					bitmaps[id] = bitmap;
				},
			);
			workers.push(worker);
		}

		return Promise.all(
			workers.map(
				(worker) =>
					new Promise((resolve) => {
						worker.on('exit', resolve);
					}),
			),
		).then(() => {
			const result = bitmaps.map((jimpBitmap, i) => {
				const bitmap = new BitmapImage(jimpBitmap);
				const delay = ugoira.ugoiraMetadata.frames[i].delay;

				const gifFrame = new GifFrame(bitmap, {
					delayCentisecs: delay / 10,
				});

				return gifFrame;
			});
			resolve(result);
		});
	});

	const { buffer } = await new GifCodec().encodeGif(gifFrames, {});
	const metadata = {
		...(await metadataPromise),
		mimeType: 'image/gif',
		fileExtension: 'gif',
	};
	return {
		metadata,
		data: buffer,
	};
}
