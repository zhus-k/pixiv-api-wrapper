import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { Autocomplete, AutocompleteV2 } from '../types/Autocomplete';
import { BookmarkRanges } from '../types/Bookmark';
import { IllustSearch, IllustsPopularPreviewSearch } from '../types/Illust';
import { NovelPopularPreviewSearch, NovelSearch } from '../types/Novel';
import { SearchParameterOptions } from '../types/SearchParameterOptions';
import { Users } from '../types/User';

type SearchParams = Pick<
	SearchParameterOptions,
	'offset' | 'searchTarget' | 'sort' | 'word'
>;
type SearchIllustParams = Pick<
	SearchParams,
	'offset' | 'searchTarget' | 'sort'
>;
type SearchPopularPreviewIllustParams = Pick<SearchParams, 'searchTarget'>;
type SearchNovelParams = Pick<SearchParams, 'offset' | 'searchTarget' | 'sort'>;
type SearchPreviewNovelParams = Pick<SearchParams, 'searchTarget'>;
type SearchUserParams = Pick<SearchParams, 'sort' | 'offset'>;

export class SearchApi extends HttpBase {
	async illust(
		word: string,
		{
			searchTarget = 'partial_match_for_tags',
			sort = 'date_desc',
			offset = 60,
		}: SearchIllustParams = {},
	): Promise<IllustSearch> {
		return await this.request<SearchParams>('GET', '/v1/search/illust', {
			searchParams: {
				word,
				searchTarget,
				sort,
				offset,
			},
		});
	}

	async popularPreviewIllust(
		word: string,
		{
			searchTarget = 'partial_match_for_tags',
		}: SearchPopularPreviewIllustParams = {},
	): Promise<IllustsPopularPreviewSearch> {
		return await this.request<Pick<SearchParams, 'word' | 'searchTarget'>>(
			'GET',
			'/v1/search/popular-preview/illust',
			{
				searchParams: {
					word,
					searchTarget,
				},
			},
		);
	}

	async novel(
		word: string,
		{
			searchTarget = 'partial_match_for_tags',
			sort = 'date_desc',
			offset = 60,
		}: SearchNovelParams = {},
	): Promise<NovelSearch> {
		return await this.request<SearchParams>('GET', '/v1/search/novel', {
			searchParams: {
				word,
				searchTarget,
				sort,
				offset,
			},
		});
	}

	async popularPreviewNovel(
		word: string,
		{ searchTarget = 'partial_match_for_tags' }: SearchPreviewNovelParams = {},
	): Promise<NovelPopularPreviewSearch> {
		return await this.request('GET', '/v1/search/popular-preview/novel', {
			searchParams: {
				word,
				searchTarget,
			},
		}).then(snakeToCamelCase<NovelPopularPreviewSearch>);
	}

	/**
	 * I don't know what this is for
	 */
	async bookmarkRangesIllust(word: string): Promise<BookmarkRanges> {
		return await this.request<Pick<SearchParams, 'word'>>(
			'GET',
			'/v1/search/bookmark-ranges/illust',
			{
				searchParams: {
					word,
				},
			},
		);
	}

	/**
	 * I don't know what this is for
	 */
	async bookmarkRangesNovel(word: string): Promise<BookmarkRanges> {
		return await this.request<Pick<SearchParams, 'word'>>(
			'GET',
			'/v1/search/bookmark-ranges/novel',
			{
				searchParams: {
					word,
				},
			},
		);
	}

	async user(
		word: string,
		{ sort = 'popular_desc', offset = 60 }: SearchUserParams = {},
	): Promise<Users> {
		return await this.request<Pick<SearchParams, 'word' | 'sort' | 'offset'>>(
			'GET',
			'/v1/search/user',
			{
				searchParams: {
					word,
					sort,
					offset,
				},
			},
		);
	}

	async autocomplete(word: string): Promise<Autocomplete> {
		return await this.request('GET', '/v1/search/autocomplete', {
			searchParams: {
				word,
			},
		});
	}

	async autocompleteV2(word: string): Promise<AutocompleteV2> {
		return await this.request('GET', '/v2/search/autocomplete', {
			searchParams: {
				word,
			},
		});
	}
}
