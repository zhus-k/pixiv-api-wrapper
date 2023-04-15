import { AuthClient } from '../auth/AuthClient';
import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { Illust } from './types';
import { Autocomplete, AutocompleteV2 } from './types/Autocomplete';
import { BookmarkRanges } from './types/Bookmark';
import { IllustSearch, IllustsPopularPreviewSearch } from './types/Illust';
import { NovelPopularPreviewSearch, NovelSearch } from './types/Novel';
import { SearchParameterOptions } from './types/SearchParameterOptions';
import { Users } from './types/User';

type SearchParams = Pick<
	SearchParameterOptions,
	'offset' | 'searchTarget' | 'sort' | 'word'
>;

export class SearchApi extends HttpBase {
	constructor(auth: AuthClient) {
		super(auth);
	}

	async illust(
		word: string,
		{
			searchTarget = 'partial_match_for_tags',
			sort = 'date_desc',
			offset = 60,
		}: Pick<SearchParams, 'offset' | 'searchTarget' | 'sort'> = {},
	): Promise<IllustSearch> {
		const response = await this.request<SearchParams>(
			'GET',
			'/v1/search/illust',
			{
				searchParams: {
					word,
					searchTarget,
					sort,
					offset,
				},
			},
		);
		return snakeToCamelCase<IllustSearch>(response);
	}

	async popularPreviewIllust(
		word: string,
		{
			searchTarget = 'partial_match_for_tags',
		}: Pick<SearchParams, 'searchTarget'> = {},
	): Promise<IllustsPopularPreviewSearch> {
		const response = await this.request<
			Pick<SearchParams, 'word' | 'searchTarget'>
		>('GET', '/v1/search/popular-preview/illust', {
			searchParams: {
				word,
				searchTarget,
			},
		});
		return snakeToCamelCase<IllustsPopularPreviewSearch>(response);
	}

	async novel(
		word: string,
		{
			searchTarget = 'partial_match_for_tags',
			sort = 'date_desc',
			offset = 60,
		}: Pick<SearchParams, 'offset' | 'searchTarget' | 'sort'> = {},
	): Promise<NovelSearch> {
		const response = await this.request<SearchParams>(
			'GET',
			'/v1/search/novel',
			{
				searchParams: {
					word,
					searchTarget,
					sort,
					offset,
				},
			},
		);
		return snakeToCamelCase<NovelSearch>(response);
	}

	async popularPreviewNovel(
		word: string,
		{
			searchTarget = 'partial_match_for_tags',
		}: Pick<SearchParams, 'searchTarget'> = {},
	): Promise<NovelPopularPreviewSearch> {
		const response = await this.request(
			'GET',
			'/v1/search/popular-preview/novel',
			{
				searchParams: {
					word,
					searchTarget,
				},
			},
		).then(snakeToCamelCase<NovelPopularPreviewSearch>);
		return response;
	}

	/**
	 * I don't know what this is for
	 */
	async bookmarkRangesIllust(word: string): Promise<BookmarkRanges> {
		const response = await this.request<Pick<SearchParams, 'word'>>(
			'GET',
			'/v1/search/bookmark-ranges/illust',
			{
				searchParams: {
					word,
				},
			},
		);
		return snakeToCamelCase<BookmarkRanges>(response);
	}

	/**
	 * I don't know what this is for
	 */
	async bookmarkRangesNovel(word: string): Promise<BookmarkRanges> {
		const response = await this.request<Pick<SearchParams, 'word'>>(
			'GET',
			'/v1/search/bookmark-ranges/novel',
			{
				searchParams: {
					word,
				},
			},
		);
		return snakeToCamelCase<BookmarkRanges>(response);
	}

	async user(
		word: string,
		{
			sort = 'popular_desc',
			offset = 60,
		}: Pick<SearchParams, 'sort' | 'offset'> = {},
	): Promise<Users> {
		const response = await this.request<
			Pick<SearchParams, 'word' | 'sort' | 'offset'>
		>('GET', '/v1/search/user', {
			searchParams: {
				word,
				sort,
				offset,
			},
		});
		return snakeToCamelCase<Users>(response);
	}

	async autocomplete(word: string): Promise<Autocomplete> {
		const response = await this.request('GET', '/v1/search/autocomplete', {
			searchParams: {
				word,
			},
		});
		return snakeToCamelCase<Autocomplete>(response);
	}

	async autocompleteV2(word: string): Promise<AutocompleteV2> {
		const response = await this.request('GET', '/v2/search/autocomplete', {
			searchParams: {
				word,
			},
		});
		return snakeToCamelCase<AutocompleteV2>(response);
	}
}
