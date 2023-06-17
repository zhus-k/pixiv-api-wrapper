import { ClientRequest } from 'node:http';
import https from 'node:https';
import { Illust } from '../api/types/Illust';
import { httpRequest } from '../helpers';
import { FileDownload } from './fileDownload';

/**
 * Downloads illust.
 * @param illust Illust detail object
 * @example
 * import fs from 'node:fs';
 * const client = await PixivApiClient.create({ userId, password });
 * const illustDetail = await client.Illust.detail('<illustId>');
 * if (illustDetail.illust.type === 'illust') {
 * 	const responses = await Utils.downloadIllusts('<illustId>');
 *	for (const response of responses) {
 *		if (response.status === "fulfilled") {
 *			const { metadata, data } = response.value;
 *			fs.writeFileSync(`${metadata.fileName}.${metadata.fileExtension}`, data);
 *		}
 *	}
 * }
 * @returns PromiseSettledResult<FileDownload>[]
 */
export async function downloadIllusts(
	illust: Illust | string,
	quality?:
		| (keyof Illust['imageUrls'] | 'original')
		| ((illust: Illust) => keyof Illust['imageUrls'] | 'original'),
): Promise<PromiseSettledResult<FileDownload>[]> {
	const links: string[] = [];
	if (typeof illust === 'string') {
		if (illust.startsWith('https://i.pximg.net/')) {
			links.push(illust);
		} else {
			throw new Error('Not a Pixiv image url');
		}
	} else if (illust.metaPages.length > 0)
		for (const page of illust.metaPages) {
			if (typeof quality === 'string') {
				links.push(page.imageUrls[quality]);
			} else if (typeof quality === 'function') {
				links.push(page.imageUrls[quality(illust)]);
			} else {
				links.push(page.imageUrls.original);
			}
		}
	else if (illust.metaSinglePage?.originalImageUrl) {
		links.push(illust.metaSinglePage.originalImageUrl);
	}

	const requests: ClientRequest[] = links.map((link) => {
		const request = https.request(new URL(link));
		request.setHeader('Referer', 'https://www.pixiv.net/');
		return request;
	});

	const responses = requests.map(async (request) => {
		const metadataPromise = new Promise<FileDownload['metadata']>(
			(resolve, reject) =>
				request.on('response', (response) => {
					const { protocol, host, path } = request;
					const { pathname } = new URL(protocol + host + path);
					const fileNameWithExtension = pathname.split('/').slice(-1)[0];
					const [fileName, fileExtension] = fileNameWithExtension.split('.');

					const { statusCode } = response;
					if (statusCode !== 200) {
						reject(`Error fetching ${fileNameWithExtension}`);
					}

					resolve({
						mimeType: response.headers['content-type'] ?? '',
						size: Number(response.headers['content-length']),
						fileName,
						fileExtension,
					});
				}),
		);
		try {
			const data = await httpRequest<Buffer>(request);
			const metadata = await metadataPromise;
			return {
				metadata,
				data,
			};
		} catch (error) {
			throw new Error(JSON.stringify(error));
		}
	});

	return Promise.allSettled(responses);
}
