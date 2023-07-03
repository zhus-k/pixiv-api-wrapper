import { env } from 'node:process';
import { beforeAll, describe, expect, it } from 'vitest';
import setup, { client } from './test.setup';

describe('Auth Api Client', () => {
	beforeAll(async () => {
		await setup;
	});

	it('should authenticate returning a new JWT', async () => {
		const { Auth } = client;
		const { accessToken, refreshToken } = Auth.getAuthentication();

		const authResponse = Auth.authenticate(env.PIXIV_RT ?? '');
		expect(authResponse).resolves.toHaveProperty('response');

		const newAuth = await authResponse;
		expect(newAuth.accessToken).toBeDefined();
		expect(newAuth.refreshToken).toBeDefined();

		// Refresh token should not change, however access token should?
		expect(newAuth.accessToken).not.toEqual(accessToken);
		expect(newAuth.refreshToken).toEqual(refreshToken);
	});

	it('should authenticate returning a new JWT', async () => {
		const { Auth } = client;
		const { accessToken, refreshToken } = Auth.getAuthentication();

		await Auth.refreshAuth();

		const newAuth = Auth.getAuthentication();
		expect(newAuth.accessToken).toBeDefined();
		expect(newAuth.refreshToken).toBeDefined();

		// Refresh token should not change, however access token should?
		expect(newAuth.accessToken).not.toEqual(accessToken);
		expect(newAuth.refreshToken).toEqual(refreshToken);
	});

	it('should use new access token', async () => {
		const { Auth, Illust } = client;
		const { accessToken, refreshToken } = Auth.getAuthentication();

		const detail1 = Illust.detail('54264006');
		expect(detail1).resolves.toHaveProperty('illust');

		await Auth.refreshAuth();

		const newAuth = Auth.getAuthentication();
		expect(newAuth.accessToken).toBeDefined();
		expect(newAuth.refreshToken).toBeDefined();

		// Refresh token should not change, however access token should?
		expect(newAuth.accessToken).not.toEqual(accessToken);
		expect(newAuth.refreshToken).toEqual(refreshToken);

		const detail2 = Illust.detail('54264006');
		expect(detail2).resolves.toHaveProperty('illust');
	});
});
