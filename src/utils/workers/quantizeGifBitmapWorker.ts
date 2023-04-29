import { BitmapImage, GifUtil } from 'gifwrap';
import Jimp from 'jimp';
import { parentPort, workerData } from 'node:worker_threads';

async function work({
	startIndex,
	framesBuffers,
}: {
	startIndex: number;
	framesBuffers: Buffer[];
}) {
	for (const [id, buffer] of framesBuffers.entries()) {
		// Deserialize to Buffer
		const jimp = await Jimp.read(Buffer.from(buffer));
		const jimpBitmap = jimp.bitmap;

		const bitmap = new BitmapImage(jimpBitmap);

		GifUtil.quantizeDekker(bitmap, 256);

		const actualId = id + startIndex;
		parentPort?.postMessage({ id: actualId, bitmap: bitmap.bitmap });
	}

	parentPort?.close();
}

work(workerData);
