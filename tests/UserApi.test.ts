import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client, userId } from './test.setup';

describe('User Api', () => {
	beforeAll(async () => {
		await setup;
	});

	it("should get user's details", async () => {
		const response = client.User.detail(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('user');
	});

	it("should get user's bookmarked artwork tags", async () => {
		const response = client.User.bookmarkTagsIllust(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('bookmarkTags');
	});

	it("should get user's bookmarked novel tags", async () => {
		const response = client.User.bookmarkTagsNovel(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('bookmarkTags');
	});

	it("should get user's bookmarked artworks", async () => {
		const response = client.User.bookmarksIllust(userId);
		response.catch(console.log);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it("should get user's following detail", async () => {
		const response = client.User.followDetail(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('followDetail');
	});

	it("should get user's followers", async () => {
		const response = client.User.followers(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('userPreviews');
	});

	it("should get user's followed users", async () => {
		const response = client.User.following(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('userPreviews');
	});

	it("should get user's artworks", async () => {
		const response = client.User.illusts(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('illusts');
	});

	it("should get user's myPixiv", async () => {
		const response = client.User.myPixiv(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('userPreviews');
	});

	it("should get user's novels", async () => {
		const response = client.User.novels(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('novels');
	});

	it('should get recommended users based on user', async () => {
		const response = client.User.recommended(userId);
		expect(response).resolves.not.toHaveProperty('error');
		expect(response).resolves.toHaveProperty('userPreviews');
	});
});
