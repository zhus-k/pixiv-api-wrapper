import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Search Api', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should get autocomplete', async () => {
		const response = client.Search.autocomplete('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('searchAutoCompleteKeywords');
	});

	it('should get v2 autocomplete', async () => {
		const response = client.Search.autocompleteV2('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('tags');
	});

	it('should get bookmark ranges by artwork search term', async () => {
		const response = client.Search.bookmarkRangesIllust('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('bookmarkRanges');
	});

	it('should get bookmark ranges by manga search term', async () => {
		const response = client.Search.bookmarkRangesNovel('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('bookmarkRanges');
	});

	it('should get artworks by search term', async () => {
		const response = client.Search.illust('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it('should get novels by search term', async () => {
		const response = client.Search.novel('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novels');
	});

	it('should get popular previews of artworks by search term', async () => {
		const response = client.Search.popularPreviewIllust('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it('should get popular previews of novels by search term', async () => {
		const response = client.Search.popularPreviewNovel('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novels');
	});

	it('should get users by search term', async () => {
		const response = client.Search.user('fantasy');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('userPreviews');
	});
});
