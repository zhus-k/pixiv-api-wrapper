import { fileTypeFromBuffer } from 'file-type';
import { beforeAll, describe, expect, it } from 'vitest';
import { Utils } from '../src';
import setup, { client } from './test.setup';

describe('utils', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should download an illustration from illust detail', async () => {
		const response = client.Illust.detail('108917371');
		expect(response).resolves.toHaveProperty('illust');

		const { illust } = await response;
		const downloads = Utils.downloadIllusts(illust);
		expect(downloads).resolves.toHaveLength(1);

		const { data } = (await downloads)[0]['value'];
		expect(data).toBeTypeOf('object');

		const result = await fileTypeFromBuffer(data);

		expect(result?.ext).toEqual('jpg');
	});

	it('should download a gif from ugoira detail', async () => {
		const response = client.Ugoira.metadata('108917371');
		expect(response).resolves.toHaveProperty('ugoiraMetadata');

		const ugoira = await response;

		const downloadResponse = Utils.downloadUgoira(ugoira);
		expect(downloadResponse).resolves.toBeTypeOf('object');

		const { data } = await downloadResponse;

		const result = await fileTypeFromBuffer(data);

		expect(result?.ext).toEqual('gif');
	});
});
