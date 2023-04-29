import { ClientRequest } from 'node:http';
import querystring from 'node:querystring';

export function httpRequest<T = string | Buffer | any>(
	request: ClientRequest,
	data?: any,
) {
	return new Promise<T>((resolve, reject) => {
		let body;
		if (['POST'].includes(request.method) && data) {
			if (typeof data === 'object') {
				if (
					request.getHeader('Content-Type') ===
					'application/x-www-form-urlencoded'
				) {
					body = querystring.stringify(data);
				} else {
					request.setHeader('Content-Type', 'application/json');
					body = JSON.stringify(data);
				}
			} else {
				body = data;
			}
		}

		request
			.on('response', (response) => {
				const { headers } = response;
				const contentType = headers['content-type'] ?? '';
				const chunks: Buffer[] = [];
				response
					.on('data', (chunk) => {
						chunks.push(chunk);
					})
					.on('end', () => {
						const binary = Buffer.concat(chunks);
						const result = processBuffer(contentType, binary);
						resolve(result);
					})
					.on('error', (err) => {
						reject(err.message);
					});
			})
			.on('error', (err) => {
				reject(err.message);
			});

		body && request.write(body);

		request.end();
	});

	function processBuffer(contentType: string, binary: Buffer) {
		if (['application/json'].some((s) => contentType.includes(s))) {
			return JSON.parse(binary.toString());
		} else if (
			['text/css', 'text/html', 'text/javascript', 'text/plain'].some((s) =>
				contentType.includes(s),
			)
		) {
			return binary.toString();
		} else if (
			[
				'application/octet-stream',
				'application/pdf',
				'audio/mpeg',
				'image/bmp',
				'image/gif',
				'image/jpeg',
				'image/png',
				'image/svg+xml',
				'image/webp',
				'video/mp4',
			].some((s) => contentType.includes(s))
		)
			return binary;
		else return binary;
	}
}
