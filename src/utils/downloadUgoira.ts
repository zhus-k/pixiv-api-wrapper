import AdmZip from 'adm-zip';
import GIFEncoder from 'gif-encoder';
import { read } from 'jimp';
import { ClientRequest } from 'node:http';
import https from 'node:https';
import { Writable } from 'node:stream';
import { Ugoira } from '../types/Ugoira';
import { httpRequest } from '../helpers';
import { FileDownload } from './fileDownload';

/**
 * Downloads and encodes Ugoira.
 * @param ugoira Ugoira detail object
 * @example
 * const client = await PixivApiClient.create({ userId, password });
 * const illustDetail = await client.Illust.detail('<illustId>');
 * if (illustDetail.illust.type === 'ugoira') {
 * 	const ugoira = await client.Ugoira.metadata('<illustId>');
 * 	const { metadata, data } = await Utils.downloadUgoira(ugoira, threads);
 * 	fs.writeFileSync(`${metadata.fileName}.${metadata.fileExtension}`, data);
 * }
 * @returns Promise<FileDownload>
 */
export async function downloadUgoira(ugoira: Ugoira): Promise<FileDownload> {
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
	const ib = await read(frameBitmaps[0]);
	const {
		bitmap: { width, height },
	} = ib;
	const gif = new GIFEncoder(width, height);
	gif.setQuality(10);
	gif.setRepeat(0);
	gif.writeHeader();
	const chunks: any[] = [];
	const ws = new Writable({
		write(chunk, _encoding, callback) {
			chunks.push(chunk);
			callback();
		},
	});
	gif.pipe(ws);
	for (const [i, framebitmap] of frameBitmaps.entries()) {
		const jbitmp = await read(framebitmap);

		gif.setDelay(ugoira.ugoiraMetadata.frames[i].delay);
		gif.addFrame(jbitmp.bitmap.data);
	}
	gif.finish();
	const buffer = Buffer.concat(chunks);
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
