import { IllustApi } from './api/IllustApi';
import { MangaApi } from './api/MangaApi';
import { NovelApi } from './api/NovelApi';
import { SearchApi } from './api/SearchApi';
import { TrendingTagsApi } from './api/TrendingTagsApi';
import { UgoiraApi } from './api/UgoiraApi';
import { UserApi } from './api/UserApi';
import { AuthClient, AuthOptions } from './auth/AuthClient';

export class PixivApiClient {
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
	 * Create an authenticated api client.
	 *
	 *
	 * Puppeteer is Optional and is only used to automate authentication by ID in a headless browser.
	 * It looks for a supported browser in the following order:
	 * 1. The supplied path argument
	 * 2. the default puppeteer executable path
	 * 3. an installed version of 'Google Chrome'
	 *
	 * You can try to use {@link https://www.npmjs.com/package/puppeteer-chromium-resolver 'puppeteer-chromium-resolver'} if you find difficulty.
	 *
	 *
	 * If no path is supplied, you will be prompted to enter the code by having to manually complete the login in the opened browser {@link https://gist.github.com/ZipFile/c9ebedb224406f4f11845ab700124362 [source]}:
	 * 1. Open dev console (F12) and switch to network tab.
	 * 2. Enable persistent logging ("Preserve log").
	 * 3. Type into the filter field: callback?
	 * 4. Proceed with Pixiv login.
	 * 5. After logging in you should see a blank page and request that looks like this: https://app-api.pixiv.net/web/v1/users/auth/pixiv/callback?state=...&code=.... Copy value of the code param into the prompt and hit the Enter key.
	 *
	 *
	 * @param {AuthOptions} options Authenticate with ID and password or refresh token.
	 * @param {string | undefined} browserExePath When authenticating by ID and password, you must provide a relative (or absolute) path to a puppeteer compatible browser otherwise supply 'false' or leave empty as the default is 'false' to complete the login manually through an opened system default browser.
	 * @example // Authenticating with Refresh Token
	 * const client = await PixivApiClient.create("<your refresh token>");
	 *
	 * @example // Authenticating with ID using relative (or absolute path) to chromium
	 * const path = "/path/to/chromium"
	 * const client = await PixivApiClient.create({ userId, password }, path);
	 *
	 * @example // Authenticating with ID using 'chromium' package
	 * const { path } = require("chromium");
	 * const client = await PixivApiClient.create({ userId, password }, path);
	 *
	 * @example // Authenticating with ID (an installed chrome)
	 * const client = await PixivApiClient.create({ userId, password });
	 * @returns {Promise<PixivApiClient>} authenticated API client
	 */
	static async create(
		options: AuthOptions,
		browserExePath: string | undefined = undefined,
	): Promise<PixivApiClient> {
		const authClient = await new AuthClient(browserExePath).authenticate(
			options,
		);

		const illustApi = new IllustApi(authClient);
		const mangaApi = new MangaApi(authClient);
		const novelApi = new NovelApi(authClient);
		const searchApi = new SearchApi(authClient);
		const trendingTagsApi = new TrendingTagsApi(authClient);
		const ugoiraApi = new UgoiraApi(authClient);
		const userApi = new UserApi(authClient);

		const client = new PixivApiClient(
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
