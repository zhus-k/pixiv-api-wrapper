import { log } from 'node:console';
import { Browser } from 'puppeteer-core';
import { AuthApi } from '../api/AuthApi';
import { Auth } from '../api/types/Auth';

type RefreshToken = string;

export type AuthOptions =
	| RefreshToken
	| {
			userId: string;
			password: string;
	  };

export class AuthClient {
	private auth!: Auth;
	private api: AuthApi;

	constructor(browser?: Browser) {
		this.api = new AuthApi(browser);
	}

	async authenticate(login: AuthOptions): Promise<AuthClient> {
		if (typeof login === 'string' && login.length > 0) {
			log('Authenticating with Refresh Token');
			const auth = await this.api.refreshToken(login);
			if (!auth) {
				throw new Error('Authentication Error');
			}
			this.set(auth);
		} else if (
			login &&
			typeof login === 'object' &&
			login.userId &&
			login.password
		) {
			log('Authenticating with ID');
			const auth = await this.api.login(login.userId, login.password);
			if (!auth) {
				throw new Error('Authentication Error');
			}
			this.set(auth);
		} else throw new Error('Authenticated required for API.');
		log('Authenticated');
		return this;
	}

	private set(auth: Auth): void {
		this.auth = auth;
	}

	getAuthentication(): Auth {
		return this.auth;
	}

	get Auth(): AuthApi {
		return this.api;
	}
}
