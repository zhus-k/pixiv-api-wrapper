import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Ugoira Api', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should get recommended manga of a manga', async () => {
		const response = client.Ugoira.metadata('108917371');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('ugoiraMetadata');
	});
});
