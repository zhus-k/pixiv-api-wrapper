import { env } from 'node:process';
import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Auth Api Client', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should authenticate returning a new JWT', async () => {
		const { accessToken, refreshToken } = client.Auth.getAuthentication();

		const authResponse = client.Auth.authenticate(env.PIXIV_RT ?? '');
		expect(authResponse).resolves.toHaveProperty('response');

		const newAuth = await authResponse;
		expect(newAuth.accessToken).toBeDefined();
		expect(newAuth.refreshToken).toBeDefined();

		// Refresh token should not change, however access token should?
		expect(newAuth.accessToken).not.toEqual(accessToken);
		expect(newAuth.refreshToken).toEqual(refreshToken);
	});

	it('should authenticate returning a new JWT', async () => {
		const { accessToken, refreshToken } = client.Auth.getAuthentication();

		await client.Auth.refreshAuth();

		const newAuth = client.Auth.getAuthentication();
		expect(newAuth.accessToken).toBeDefined();
		expect(newAuth.refreshToken).toBeDefined();

		// Refresh token should not change, however access token should?
		expect(newAuth.accessToken).not.toEqual(accessToken);
		expect(newAuth.refreshToken).toEqual(refreshToken);
	});
});
