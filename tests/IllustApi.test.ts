import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Illust Api', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should get detail of an artwork', async () => {
		const response = client.Illust.detail('54264006');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illust');
	});

	it('should get bookmark detail of an artwork', async () => {
		const response = client.Illust.bookmarkDetail('54264006');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('bookmarkDetail');
	});

	it('should get comments of an artwork', async () => {
		const response = client.Illust.comments('54264006');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('comments');
	});

	it('should get v2 comments of an artwork', async () => {
		const response = client.Illust.commentsV2('54264006');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('comments');
	});

	it('should get follows of an artwork', async () => {
		const response = client.Illust.follow('54264006');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it('should get newest artworks', async () => {
		const response = client.Illust.new();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it('should get top ranked artworks', async () => {
		const response = client.Illust.ranking();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it('should get recommended artworks of an artwork', async () => {
		const response = client.Illust.recommended();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it('should get related artworks of an artwork', async () => {
		const response = client.Illust.related('54264006');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});
});
