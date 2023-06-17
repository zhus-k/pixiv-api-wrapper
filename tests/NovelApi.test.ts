import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Novel Api', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should get detail of a novel', async () => {
		const response = client.Novel.detail('15628042');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novel');
	});

	it('should get bookmark detail of a novel', async () => {
		const response = client.Novel.bookmarkDetailV2('15628042');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('bookmarkDetail');
	});

	it('should get comments of a novel', async () => {
		const response = client.Novel.comments('15628042');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('comments');
	});

	it('should get v2 comments of a novel', async () => {
		const response = client.Novel.commentsV2('15628042');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('comments');
	});

	it('should get follows of a novel', async () => {
		const response = client.Novel.follow();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novels');
	});

	it('should get newest novels', async () => {
		const response = client.Novel.new();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novels');
	});

	it('should get top ranked novels', async () => {
		const response = client.Novel.ranking();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novels');
	});

	it('should get recommended artworks of a novel', async () => {
		const response = client.Novel.recommended();
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novels');
	});

	it("should get series' novel", async () => {
		const response = client.Novel.series('1429064');
		expect(response).resolves.not.toHaveProperty('error');
	});

	it('should get error if novel is not of a series', async () => {
		const response = client.Novel.series('15628042');
		expect(response).rejects.toHaveProperty('error');
	});

	it('should get text of a novel', async () => {
		const response = client.Novel.text('15628042');
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novelText');
	});
});
