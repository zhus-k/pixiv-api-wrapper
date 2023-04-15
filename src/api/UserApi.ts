import { AuthClient } from '../auth/AuthClient';
import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { BookmarkTags } from './types/Bookmark';
import { Illusts } from './types/Illust';
import { UserNovel } from './types/Novel';
import { SearchParameterOptions } from './types/SearchParameterOptions';
import { Follow, RecommendedUser, UserDetail, Users } from './types/User';

type UserSearchParams = Pick<
	SearchParameterOptions,
	'restrict' | 'maxBookmarkId' | 'userId' | 'offset'
>;

export class UserApi extends HttpBase {
	constructor(auth: AuthClient) {
		super(auth);
	}

	async detail(id: string | number): Promise<UserDetail> {
		const response = await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/detail',
			{
				searchParams: {
					userId: id,
				},
			},
		);
		return snakeToCamelCase<UserDetail>(response);
	}

	async illusts(
		id: string | number,
		{ offset = 30 }: Pick<UserSearchParams, 'userId' | 'offset'> = {},
	): Promise<Illusts> {
		const response = await this.request<
			Pick<UserSearchParams, 'userId' | 'offset'>
		>('GET', '/v1/user/illusts', {
			searchParams: {
				userId: id,
				offset,
			},
		});
		return snakeToCamelCase<Illusts>(response);
	}

	async novels(
		id: string | number,
		{ offset = 30 }: Pick<UserSearchParams, 'userId' | 'offset'> = {},
	): Promise<UserNovel> {
		const response = await this.request<
			Pick<UserSearchParams, 'userId' | 'offset'>
		>('GET', '/v1/user/novels', {
			searchParams: {
				userId: id,
				offset,
			},
		});
		return snakeToCamelCase<UserNovel>(response);
	}

	async bookmarksIllust(
		id: string | number,
		{ maxBookmarkId, restrict = 'all' }: UserSearchParams = {
			restrict: 'all',
		},
	): Promise<Illusts> {
		const response = await this.request<
			Pick<UserSearchParams, 'userId' | 'restrict' | 'maxBookmarkId'>
		>('GET', '/v1/user/bookmarks/illust', {
			searchParams: {
				userId: id,
				restrict,
				maxBookmarkId,
			},
		});
		return snakeToCamelCase<Illusts>(response);
	}

	async bookmarkTagsIllust(
		id: string | number,
		{ restrict = 'all' }: Pick<UserSearchParams, 'restrict'> = {
			restrict: 'all',
		},
	): Promise<BookmarkTags> {
		const response = await this.request<
			Pick<UserSearchParams, 'userId' | 'restrict'>
		>('GET', '/v1/user/bookmark-tags/illust', {
			searchParams: {
				userId: id,
				restrict,
			},
		});
		return snakeToCamelCase<BookmarkTags>(response);
	}

	async bookmarkTagsNovel(
		id: string | number,
		{ restrict = 'all' }: Pick<UserSearchParams, 'restrict'> = {
			restrict: 'all',
		},
	): Promise<BookmarkTags> {
		const response = await this.request<
			Pick<UserSearchParams, 'userId' | 'restrict'>
		>('GET', '/v1/user/bookmark-tags/novel', {
			searchParams: {
				userId: id,
				restrict,
			},
		});
		return snakeToCamelCase<BookmarkTags>(response);
	}

	async following(
		id: string | number,
		{ offset = 30 }: Pick<UserSearchParams, 'offset'> = {},
	): Promise<Users> {
		const response = await this.request<
			Pick<UserSearchParams, 'userId' | 'offset'>
		>('GET', '/v1/user/following', {
			searchParams: {
				userId: id,
				offset,
			},
		});
		return snakeToCamelCase<Users>(response);
	}

	async followers(
		id: string | number,
		{ offset = 30 }: Pick<UserSearchParams, 'offset'> = {},
	): Promise<Users> {
		const response = await this.request<
			Pick<UserSearchParams, 'userId' | 'offset'>
		>('GET', '/v1/user/follower', {
			searchParams: {
				userId: id,
				offset,
			},
		});
		return snakeToCamelCase<Users>(response);
	}

	async myPixiv(id: string | number): Promise<Users> {
		const response = await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/mypixiv',
			{
				searchParams: {
					userId: id,
				},
			},
		);
		return snakeToCamelCase<Users>(response);
	}

	async recommended(id: string | number): Promise<RecommendedUser> {
		const response = await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/recommended',
			{
				searchParams: {
					userId: id,
				},
			},
		);
		return snakeToCamelCase<RecommendedUser>(response);
	}

	async followDetail(id: string | number): Promise<Follow> {
		const response = await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/follow/detail',
			{
				searchParams: {
					userId: id,
				},
			},
		);
		return snakeToCamelCase<Follow>(response);
	}
}
