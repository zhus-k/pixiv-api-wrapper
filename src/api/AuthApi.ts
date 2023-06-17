import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import https from 'node:https';
import readline from 'node:readline/promises';
import { Browser } from 'puppeteer-core';
import {
	clientId as client_id,
	clientSecret as client_secret,
	loginUrl as login_url,
	oauthUrl,
	redirectUri as redirect_uri,
	userAgent,
} from '../constants/constants';
import {
	escapeParams,
	getPlatformUriOpener,
	httpRequest,
	snakeToCamelCase,
	timeOutPromise,
} from '../helpers';
import { Auth } from './types/Auth';

export class AuthApi {
	constructor(private browser?: Browser) {}

	async login(userId: string, password: string): Promise<Auth> {
		const [code_verifier, code_challenge] = this.oauthPKCE();

		const loginParams = new URLSearchParams();
		loginParams.append('code_challenge', code_challenge);
		loginParams.append('code_challenge_method', 'S256');
		loginParams.append('client', 'pixiv-android');

		const loginUrl = `${login_url}?${loginParams.toString()}`;

		const code = await this.getCode(loginUrl, userId, password);

		const response: Auth = await this.loginRequest(code, code_verifier);

		return response;
	}

	private async getCode(
		loginUrl: string,
		userId: string,
		password: string,
	): Promise<string> {
		if (!this.browser) {
			const start = getPlatformUriOpener();
			const execStr = `${start} ${escapeParams(loginUrl)}`;
			exec(execStr);
			const rl = readline.createInterface({
				input: process.stdin,
				output: process.stdout,
			});
			const code = await rl.question('Enter code: ');
			return code;
		}

		const browser = this.browser;
		const browserCtx = await browser.createIncognitoBrowserContext();
		const page = await browserCtx.newPage();
		await page.setViewport({
			width: 800,
			height: 600,
			deviceScaleFactor: 1,
		});
		await Promise.all([
			page.goto(loginUrl, { waitUntil: 'domcontentloaded' }),
			new Promise<void>((resolve) => {
				setTimeout(() => {
					resolve();
				}, 10_000);
			}),
		]);
		const promisedCode = new Promise<string | null>((resolve) => {
			page.on('request', (request) => {
				const url = new URL(request.url());
				const code = url.searchParams.get('code');
				if (code) {
					resolve(code);
				}
			});
		});
		await page.type('form input[autocomplete="username"]', userId, {
			delay: 25,
		});
		await page.type('form input[autocomplete="current-password"]', password, {
			delay: 25,
		});
		await page.click('form > button[type="submit"]', { delay: 100 });

		const code = await timeOutPromise(promisedCode, 10_000).catch(() => null);

		browser.close();

		if (!code) {
			throw new Error('Did not find code');
		}
		return code;
	}

	private async loginRequest(
		code: string,
		code_verifier: string,
	): Promise<Auth> {
		const data = {
			client_id,
			client_secret,
			code,
			code_verifier,
			grant_type: 'authorization_code',
			include_policy: true,
			redirect_uri,
		};

		const { host, pathname: path } = new URL(oauthUrl);

		const request = https.request({
			host,
			path,
			method: 'POST',
			headers: {
				'User-Agent': userAgent,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		return await httpRequest<Auth>(request, data);
	}

	async refreshToken(refresh_token: string): Promise<Auth> {
		const data = {
			client_id,
			client_secret,
			grant_type: 'refresh_token',
			include_policy: true,
			refresh_token,
		};

		const { host, pathname: path } = new URL(oauthUrl);

		const request = https.request({
			host,
			path,
			method: 'POST',
			headers: {
				'User-Agent': userAgent,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		});

		const response = await httpRequest(request, data).then(
			snakeToCamelCase<Auth>,
		);

		// const response = await httpRequest(request, data)
		// 	.then((response) => {
		// 		const cased = snakeToCamelCase(response)
		// 		if (cased.error) {
		// 			throw cased as AuthError;
		// 		}
		// 		else return cased as Auth;
		// 	});

		return response;
	}

	private oauthPKCE(): [codeVerifier: string, codeChallenge: string] {
		const codeVerifier = Buffer.from(crypto.randomBytes(32)).toString(
			'base64url',
		);
		const codeChallenge = crypto
			.createHash('sha256')
			.update(codeVerifier)
			.digest('base64url');

		return [codeVerifier, codeChallenge];
	}
}
