import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { BookmarkDetail } from './types/Bookmark';
import { Comments } from './types/Comments';
import { CommentsV2 } from './types/CommentsV2';
import { IllustDetail, Illusts, RecommendedIllusts } from './types/Illust';
import { SearchParameterOptions } from './types/SearchParameterOptions';

type IllustSearchParams = Pick<
	SearchParameterOptions,
	| 'illustId'
	| 'maxIllustId'
	| 'restrict'
	| 'minBookmarkIdForRecentIllust'
	| 'offset'
>;

export class IllustApi extends HttpBase {
	async detail(id: string | number): Promise<IllustDetail> {
		const response = await this.request<Pick<IllustSearchParams, 'illustId'>>(
			'GET',
			'/v1/illust/detail',
			{
				searchParams: {
					illustId: id,
				},
			},
		);
		return snakeToCamelCase<IllustDetail>(response);
	}

	async new({
		maxIllustId,
	}: Pick<IllustSearchParams, 'maxIllustId'> = {}): Promise<Illusts> {
		const response = await this.request<
			Pick<IllustSearchParams, 'maxIllustId'>
		>('GET', '/v1/illust/new', {
			searchParams: {
				maxIllustId,
			},
		});
		return snakeToCamelCase<Illusts>(response);
	}

	async follow(
		id: string | number,
		{ restrict = 'all' }: Pick<IllustSearchParams, 'restrict'> = {},
	): Promise<Illusts> {
		const response = await this.request<
			Pick<IllustSearchParams, 'illustId' | 'restrict'>
		>('GET', '/v2/illust/follow', {
			searchParams: {
				illustId: id,
				restrict,
			},
		});
		return snakeToCamelCase<Illusts>(response);
	}

	async comments(id: string | number): Promise<Comments> {
		const response = await this.request<Pick<IllustSearchParams, 'illustId'>>(
			'GET',
			'/v1/illust/comments',
			{
				searchParams: {
					illustId: id,
				},
			},
		);
		return snakeToCamelCase<Comments>(response);
	}

	async commentsV2(id: string | number): Promise<CommentsV2> {
		const response = await this.request<Pick<IllustSearchParams, 'illustId'>>(
			'GET',
			'/v2/illust/comments',
			{
				searchParams: {
					illustId: id,
				},
			},
		);
		return snakeToCamelCase<CommentsV2>(response);
	}

	async recommended({
		minBookmarkIdForRecentIllust = 0,
		offset = 30,
	}: Pick<
		IllustSearchParams,
		'minBookmarkIdForRecentIllust' | 'offset'
	> = {}): Promise<RecommendedIllusts> {
		const response = await this.request<
			Pick<IllustSearchParams, 'minBookmarkIdForRecentIllust' | 'offset'>
		>('GET', '/v1/illust/recommended', {
			searchParams: {
				minBookmarkIdForRecentIllust,
				offset,
			},
		});
		return snakeToCamelCase<RecommendedIllusts>(response);
	}

	async ranking({
		offset = 30,
	}: Pick<IllustSearchParams, 'offset'> = {}): Promise<Illusts> {
		const response = await this.request<Pick<IllustSearchParams, 'offset'>>(
			'GET',
			'/v1/illust/ranking',
			{
				searchParams: { offset },
			},
		);

		return snakeToCamelCase<Illusts>(response);
	}

	async bookmarkDetail(id: string | number): Promise<BookmarkDetail> {
		const response = await this.request('GET', '/v2/illust/bookmark/detail', {
			searchParams: {
				illustId: id,
			},
		});
		return snakeToCamelCase<BookmarkDetail>(response);
	}

	async related(id: string | number): Promise<Illusts> {
		const response = await this.request('GET', '/v2/illust/related', {
			searchParams: {
				illustId: id,
			},
		});
		return snakeToCamelCase<Illusts>(response);
	}
}
