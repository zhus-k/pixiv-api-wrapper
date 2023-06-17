import { HttpBase } from './HttpBase';
import { BookmarkTags } from './types/Bookmark';
import { Illusts } from './types/Illust';
import { UserNovel } from './types/Novel';
import {
	AllVisibility,
	SearchParameterOptions,
} from './types/SearchParameterOptions';
import { Follow, RecommendedUser, UserDetail, Users } from './types/User';

type UserSearchParams = Pick<
	SearchParameterOptions,
	'restrict' | 'maxBookmarkId' | 'userId' | 'offset'
>;
type UserIllustsParams = Pick<UserSearchParams, 'userId' | 'offset'>;
type UserNovelsParams = Pick<UserSearchParams, 'userId' | 'offset'>;
type UserBookmarksIllustParams = UserSearchParams;
type UserBookmarkTagsIllustParams = Pick<UserSearchParams, 'restrict'>;
type UserBookmarkTagsNovelParams = Pick<UserSearchParams, 'restrict'>;
type UserFollowingParams = Pick<UserSearchParams, 'offset'>;
type UserFollowersParams = Pick<UserSearchParams, 'offset'>;

export class UserApi extends HttpBase {
	async detail(id: string | number): Promise<UserDetail> {
		return await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/detail',
			{
				searchParams: {
					userId: id,
				},
			},
		);
	}

	async illusts(
		id: string | number,
		{ offset = 30 }: UserIllustsParams = {},
	): Promise<Illusts> {
		return await this.request<Pick<UserSearchParams, 'userId' | 'offset'>>(
			'GET',
			'/v1/user/illusts',
			{
				searchParams: {
					userId: id,
					offset,
				},
			},
		);
	}

	async novels(
		id: string | number,
		{ offset = 30 }: UserNovelsParams = {},
	): Promise<UserNovel> {
		return await this.request<Pick<UserSearchParams, 'userId' | 'offset'>>(
			'GET',
			'/v1/user/novels',
			{
				searchParams: {
					userId: id,
					offset,
				},
			},
		);
	}

	async bookmarksIllust(
		id: string | number,
		{ maxBookmarkId, restrict = 'public' }: UserBookmarksIllustParams = {
			restrict: 'public',
		},
	): Promise<Illusts> {
		return await this.request<
			Pick<UserSearchParams, 'userId' | 'restrict' | 'maxBookmarkId'>
		>('GET', '/v1/user/bookmarks/illust', {
			searchParams: {
				userId: id,
				restrict,
				maxBookmarkId,
			},
		});
	}

	async bookmarkTagsIllust(
		id: string | number,
		{ restrict = 'all' }: UserBookmarkTagsIllustParams = {
			restrict: 'all',
		},
	): Promise<BookmarkTags> {
		return await this.request<Pick<UserSearchParams, 'userId' | 'restrict'>>(
			'GET',
			'/v1/user/bookmark-tags/illust',
			{
				searchParams: {
					userId: id,
					restrict,
				},
			},
		);
	}

	async bookmarkTagsNovel(
		id: string | number,
		{ restrict = 'all' }: UserBookmarkTagsNovelParams = {
			restrict: 'all',
		},
	): Promise<BookmarkTags> {
		return await this.request<Pick<UserSearchParams, 'userId' | 'restrict'>>(
			'GET',
			'/v1/user/bookmark-tags/novel',
			{
				searchParams: {
					userId: id,
					restrict,
				},
			},
		);
	}

	async following(
		id: string | number,
		{ offset = 30 }: UserFollowingParams = {},
	): Promise<Users> {
		return await this.request<Pick<UserSearchParams, 'userId' | 'offset'>>(
			'GET',
			'/v1/user/following',
			{
				searchParams: {
					userId: id,
					offset,
				},
			},
		);
	}

	async followers(
		id: string | number,
		{ offset = 30 }: UserFollowersParams = {},
	): Promise<Users> {
		return await this.request<Pick<UserSearchParams, 'userId' | 'offset'>>(
			'GET',
			'/v1/user/follower',
			{
				searchParams: {
					userId: id,
					offset,
				},
			},
		);
	}

	async myPixiv(id: string | number): Promise<Users> {
		return await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/mypixiv',
			{
				searchParams: {
					userId: id,
				},
			},
		);
	}

	async recommended(id: string | number): Promise<RecommendedUser> {
		return await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/recommended',
			{
				searchParams: {
					userId: id,
				},
			},
		);
	}

	async followDetail(id: string | number): Promise<Follow> {
		return await this.request<Pick<UserSearchParams, 'userId'>>(
			'GET',
			'/v1/user/follow/detail',
			{
				searchParams: {
					userId: id,
				},
			},
		);
	}
}
