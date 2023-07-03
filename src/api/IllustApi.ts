import { HttpBase } from './HttpBase';
import { BookmarkDetail } from '../types/Bookmark';
import { Comments } from '../types/Comments';
import { CommentsV2 } from '../types/CommentsV2';
import { IllustDetail, Illusts, RecommendedIllusts } from '../types/Illust';
import { SearchParameterOptions } from '../types/SearchParameterOptions';

type IllustSearchParams = Pick<
	SearchParameterOptions,
	| 'illustId'
	| 'maxIllustId'
	| 'restrict'
	| 'minBookmarkIdForRecentIllust'
	| 'offset'
>;
type IllustNewParams = Pick<IllustSearchParams, 'maxIllustId'>;
type IllustFollowParams = Pick<IllustSearchParams, 'restrict'>;
type IllustRecommendedParams = Pick<
	IllustSearchParams,
	'minBookmarkIdForRecentIllust' | 'offset'
>;
type IllustRankingParams = Pick<IllustSearchParams, 'offset'>;

export class IllustApi extends HttpBase {
	async detail(id: string | number): Promise<IllustDetail> {
		return await this.request<Pick<IllustSearchParams, 'illustId'>>(
			'GET',
			'/v1/illust/detail',
			{
				searchParams: {
					illustId: id,
				},
			},
		);
	}

	async new({ maxIllustId }: IllustNewParams = {}): Promise<Illusts> {
		return await this.request<Pick<IllustSearchParams, 'maxIllustId'>>(
			'GET',
			'/v1/illust/new',
			{
				searchParams: {
					maxIllustId,
				},
			},
		);
	}

	async follow(
		id: string | number,
		{ restrict = 'all' }: IllustFollowParams = {},
	): Promise<Illusts> {
		return await this.request<
			Pick<IllustSearchParams, 'illustId' | 'restrict'>
		>('GET', '/v2/illust/follow', {
			searchParams: {
				illustId: id,
				restrict,
			},
		});
	}

	async comments(id: string | number): Promise<Comments> {
		return await this.request<Pick<IllustSearchParams, 'illustId'>>(
			'GET',
			'/v1/illust/comments',
			{
				searchParams: {
					illustId: id,
				},
			},
		);
	}

	async commentsV2(id: string | number): Promise<CommentsV2> {
		return await this.request<Pick<IllustSearchParams, 'illustId'>>(
			'GET',
			'/v2/illust/comments',
			{
				searchParams: {
					illustId: id,
				},
			},
		);
	}

	async recommended({
		minBookmarkIdForRecentIllust = 0,
		offset = 30,
	}: IllustRecommendedParams = {}): Promise<RecommendedIllusts> {
		return await this.request<
			Pick<IllustSearchParams, 'minBookmarkIdForRecentIllust' | 'offset'>
		>('GET', '/v1/illust/recommended', {
			searchParams: {
				minBookmarkIdForRecentIllust,
				offset,
			},
		});
	}

	async ranking({ offset = 30 }: IllustRankingParams = {}): Promise<Illusts> {
		return await this.request<Pick<IllustSearchParams, 'offset'>>(
			'GET',
			'/v1/illust/ranking',
			{
				searchParams: { offset },
			},
		);
	}

	async bookmarkDetail(id: string | number): Promise<BookmarkDetail> {
		return await this.request('GET', '/v2/illust/bookmark/detail', {
			searchParams: {
				illustId: id,
			},
		});
	}

	async related(id: string | number): Promise<Illusts> {
		return await this.request('GET', '/v2/illust/related', {
			searchParams: {
				illustId: id,
			},
		});
	}
}
