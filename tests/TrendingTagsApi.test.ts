import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Trending Tags Api', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should get trending tags in artworks', async () => {
		const response = client.TrendingTags.illust();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('trendTags');
	});

	it('should get trending tags in novels', async () => {
		const response = client.TrendingTags.novel();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('trendTags');
	});
});
