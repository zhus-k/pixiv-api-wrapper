import { env } from 'node:process';
import { describe, expect, it } from 'vitest';
import { PixivApi } from '../src';

describe('Client creation', () => {
	it('should create an authenticated client with Refresh Token', async () => {
		expect(env.PIXIV_RT).toBeDefined();
		const client = await PixivApi.create(env.PIXIV_RT ?? '');
		expect(client).toBeDefined();

		const { accessToken, refreshToken } = client.Auth.getAuthentication();
		expect(accessToken).toBeDefined();
		expect(refreshToken).toBeDefined();
	});

	it('should fail authenticating with invalid refresh token', async () => {
		await expect(() => PixivApi.create('')).rejects.toThrowError();
		await expect(() => PixivApi.create('a')).rejects.toThrowError();
	});
});
