import { HttpBase } from './HttpBase';
import { RecommendedManga } from '../types/Illust';
import { SearchParameterOptions } from '../types/SearchParameterOptions';

type MangaSearchParams = Pick<SearchParameterOptions, 'offset'>;

export class MangaApi extends HttpBase {
	async recommended({
		offset = 60,
	}: MangaSearchParams = {}): Promise<RecommendedManga> {
		return await this.request<MangaSearchParams>(
			'GET',
			'/v1/manga/recommended',
			{
				searchParams: {
					offset,
				},
			},
		);
	}
}
