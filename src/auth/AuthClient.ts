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

	async authenticate(login: AuthOptions): Promise<Auth> {
		if (typeof login === 'string' && login.length > 0) {
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
			const auth = await this.api.login(login.userId, login.password);
			if (!auth) {
				throw new Error('Authentication Error');
			}
			this.set(auth);
		} else throw new Error('Authentication required for API.');
		return this.getAuthentication();
	}

	/**
	 * Reauthenticates client with Refresh Token
	 * @returns Refresh Token
	 */
	async refreshAuth() {
		if (this.auth.refreshToken) {
			const auth = await this.api.refreshToken(this.auth.refreshToken);
			this.set(auth);
			return this.auth.refreshToken;
		}
		return null;
	}

	private set(auth: Auth): void {
		this.auth = auth;
	}

	getAuthentication(): Auth {
		return this.auth;
	}
}
