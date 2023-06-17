import { Browser } from 'puppeteer-core';
import { IllustApi } from './api/IllustApi';
import { MangaApi } from './api/MangaApi';
import { NovelApi } from './api/NovelApi';
import { SearchApi } from './api/SearchApi';
import { TrendingTagsApi } from './api/TrendingTagsApi';
import { UgoiraApi } from './api/UgoiraApi';
import { UserApi } from './api/UserApi';
import { AuthClient, AuthOptions } from './auth/AuthClient';

export class PixivApi {
	private constructor(
		protected authClient: AuthClient,
		protected illustApi: IllustApi,
		protected mangaApi: MangaApi,
		protected novelApi: NovelApi,
		protected searchApi: SearchApi,
		protected trendingTagsApi: TrendingTagsApi,
		protected ugoiraApi: UgoiraApi,
		protected userApi: UserApi,
	) {}

	/**
	 * Create an authenticated Pixiv API client.
	 *
	 *
	 * Puppeteer is Optional and is only used to automate authentication by ID in a headless browser.
	 *
	 * @param {AuthOptions} options ID and password or Refresh Token.
	 * @param {Browser | undefined} browser Optional puppeteer compatible browser (not included) to authenticate by ID and password.
	 * @example // 1. Authenticate with Refresh Token
	 * const client = await PixivApi.create("<your refresh token>");
	 * @example // 2. Authenticating with ID (puppeteer)
	 * const browser = await puppeteer.launch({ headless: 'new' });
	 * const client = await PixivApi.create({ userId, password }, browser);
	 * @example // 3. Complete authentication in an opened browser
	 * const client = await PixivApi.create({ userId, password });
	 * @returns {Promise<PixivApi>} authenticated API client
	 */
	static async create(
		options: AuthOptions,
		browser?: Browser,
	): Promise<PixivApi> {
		const authClient = new AuthClient(browser);
		await authClient.authenticate(options);

		const illustApi = new IllustApi(authClient);
		const mangaApi = new MangaApi(authClient);
		const novelApi = new NovelApi(authClient);
		const searchApi = new SearchApi(authClient);
		const trendingTagsApi = new TrendingTagsApi(authClient);
		const ugoiraApi = new UgoiraApi(authClient);
		const userApi = new UserApi(authClient);

		const client = new PixivApi(
			authClient,
			illustApi,
			mangaApi,
			novelApi,
			searchApi,
			trendingTagsApi,
			ugoiraApi,
			userApi,
		);
		return client;
	}

	get Auth(): AuthClient {
		return this.authClient;
	}

	get Illust(): IllustApi {
		return this.illustApi;
	}

	get Manga(): MangaApi {
		return this.mangaApi;
	}

	get Novel(): NovelApi {
		return this.novelApi;
	}

	get Search(): SearchApi {
		return this.searchApi;
	}

	get TrendingTags(): TrendingTagsApi {
		return this.trendingTagsApi;
	}

	get Ugoira(): UgoiraApi {
		return this.ugoiraApi;
	}

	get User(): UserApi {
		return this.userApi;
	}
}
