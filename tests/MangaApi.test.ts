import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Manga Api', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should get recommended manga of a manga', async () => {
		const response = client.Manga.recommended();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});
});
