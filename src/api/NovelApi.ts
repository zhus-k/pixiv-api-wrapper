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
type NovelFollowParams = Pick<NovelSearchParams, 'restrict'>;
type NovelRecommendedParams = Pick<NovelSearchParams, 'offset'>;
type NovelRankingParams = Pick<NovelSearchParams, 'offset'>;

export class NovelApi extends HttpBase {
	async detail(id: string | number): Promise<NovelDetail> {
		return await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v2/novel/detail',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
	}

	async text(id: string | number): Promise<NovelText> {
		return await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v1/novel/text',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
	}

	async new({ maxNovelId }: NovelSearchParams = {}): Promise<Novels> {
		return await this.request<Pick<NovelSearchParams, 'maxNovelId'>>(
			'GET',
			'/v1/novel/new',
			{
				searchParams: {
					maxNovelId,
				},
			},
		);
	}

	async follow(
		{ restrict }: NovelFollowParams = { restrict: 'all' },
	): Promise<Novels> {
		return await this.request<Pick<NovelSearchParams, 'restrict'>>(
			'GET',
			'/v1/novel/follow',
			{
				searchParams: {
					restrict,
				},
			},
		);
	}

	async recommended({
		offset = 15,
	}: NovelRecommendedParams = {}): Promise<RecommendedNovels> {
		return await this.request<Pick<NovelSearchParams, 'offset'>>(
			'GET',
			'/v1/novel/recommended',
			{
				searchParams: {
					offset,
				},
			},
		);
	}

	async comments(id: string | number): Promise<Comments> {
		return await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v1/novel/comments',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
	}

	async commentsV2(id: string | number): Promise<CommentsV2> {
		return await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v2/novel/comments',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
	}

	async series(id: string | number): Promise<Novels> {
		return await this.request<Pick<NovelSearchParams, 'seriesId'>>(
			'GET',
			'/v1/novel/series',
			{
				searchParams: {
					seriesId: id,
				},
			},
		);
	}

	async ranking({ offset = 30 }: NovelRankingParams = {}): Promise<Novels> {
		return await this.request<Pick<NovelSearchParams, 'offset'>>(
			'GET',
			'/v1/novel/ranking',
			{
				searchParams: {
					offset,
				},
			},
		);
	}

	async bookmarkDetailV2(id: string | number): Promise<BookmarkDetail> {
		return await this.request<Pick<NovelSearchParams, 'novelId'>>(
			'GET',
			'/v2/novel/bookmark/detail',
			{
				searchParams: {
					novelId: id,
				},
			},
		);
	}
}
