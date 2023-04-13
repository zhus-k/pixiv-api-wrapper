import { AuthClient } from '../auth/AuthClient';
import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { RecommendedManga } from './types/Illust';
import { SearchParameterOptions } from './types/SearchParameterOptions';

type MangaSearchParams = Pick<SearchParameterOptions, 'offset'>;

export class MangaApi extends HttpBase {
	constructor(auth: AuthClient) {
		super(auth);
	}

	async recommended({ offset = 60 }: MangaSearchParams = {}) {
		const response = await this.request<MangaSearchParams>(
			'GET',
			'/v1/manga/recommended',
			{
				searchParams: {
					offset,
				},
			},
		);
		return snakeToCamelCase<RecommendedManga>(response);
	}
}