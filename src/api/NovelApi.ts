import { AuthClient } from '../auth/AuthClient';
import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { BookmarkDetail } from './types/Bookmark';
import { Comments } from './types/Comments';
import { CommentsV2 } from './types/CommentsV2';
import {
	NovelDetail,
	NovelText,
	Novels,
	RecommendedNovels,
} from './types/Novel';
import { SearchParameterOptions } from './types/SearchParameterOptions';

type NovelSearchParams = Pick<
	SearchParameterOptions,
	'maxNovelId' | 'restrict' | 'offset' | 'novelId' | 'seriesId'
>;

export class NovelApi extends HttpBase {
	constructor(auth: AuthClient) {
		super(auth);
	}

	async detail(id: string | number): Promise<NovelDetail> {
		const response = await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v2/novel/detail',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
		// return (response);
		return snakeToCamelCase<NovelDetail>(response);
	}

	async text(id: string | number): Promise<NovelText> {
		const response = await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v1/novel/text',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
		return snakeToCamelCase<NovelText>(response);
	}

	async new({ maxNovelId }: NovelSearchParams = {}): Promise<Novels> {
		const response = await this.request<Pick<NovelSearchParams, 'maxNovelId'>>(
			'GET',
			'/v1/novel/new',
			{
				searchParams: {
					maxNovelId,
				},
			},
		);
		return snakeToCamelCase<Novels>(response);
	}

	async follow(
		{ restrict }: Pick<NovelSearchParams, 'restrict'> = { restrict: 'all' },
	): Promise<Novels> {
		const response = await this.request<Pick<NovelSearchParams, 'restrict'>>(
			'GET',
			'/v1/novel/follow',
			{
				searchParams: {
					restrict,
				},
			},
		);
		return snakeToCamelCase<Novels>(response);
	}

	async recommended({
		offset = 15,
	}: Pick<NovelSearchParams, 'offset'> = {}): Promise<RecommendedNovels> {
		const response = await this.request<Pick<NovelSearchParams, 'offset'>>(
			'GET',
			'/v1/novel/recommended',
			{
				searchParams: {
					offset,
				},
			},
		);
		return snakeToCamelCase<RecommendedNovels>(response);
	}

	async comments(id: string | number): Promise<Comments> {
		const response = await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v1/novel/comments',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
		return snakeToCamelCase<Comments>(response);
	}

	async commentsV2(id: string | number): Promise<CommentsV2> {
		const response = await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v2/novel/comments',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
		return snakeToCamelCase<CommentsV2>(response);
	}

	async series(id: string | number): Promise<Novels> {
		const response = await this.request<Pick<NovelSearchParams, 'seriesId'>>(
			'GET',
			'/v1/novel/series',
			{
				searchParams: {
					seriesId: id,
				},
			},
		);
		return snakeToCamelCase<Novels>(response);
	}

	async ranking({
		offset = 30,
	}: Pick<NovelSearchParams, 'offset'> = {}): Promise<Novels> {
		const response = await this.request<Pick<NovelSearchParams, 'offset'>>(
			'GET',
			'/v1/novel/ranking',
			{
				searchParams: {
					offset,
				},
			},
		);
		return snakeToCamelCase<Novels>(response);
	}

	async bookmarkDetailV2(id: string | number): Promise<BookmarkDetail> {
		const response = await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v2/novel/bookmark/detail',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
		return snakeToCamelCase<BookmarkDetail>(response);
	}
}
