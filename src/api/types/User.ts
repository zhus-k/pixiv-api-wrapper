import type { CamelCasedPropertiesDeep } from 'type-fest';
import { Illust } from './Illust';
import { Novel } from './Novel';
import { Visibility } from './SearchParameterOptions';

export type User = CamelCasedPropertiesDeep<Response.User>;
export type Users = CamelCasedPropertiesDeep<Response.Users>;
export type UserDetail = CamelCasedPropertiesDeep<Response.UserDetail>;
export type RecommendedUser =
	CamelCasedPropertiesDeep<Response.RecommendedUser>;
export type Follow = CamelCasedPropertiesDeep<Response.Follow>;

export namespace Response {
	export interface RecommendedUser {
		user_previews: UserPreview;
		next_url: string | null;
	}

	export interface Users {
		user_previews: UserPreview[];
		next_url: string | null;
	}

	export interface UserPreview {
		user: User;
		illusts: Illust[];
		novels: Novel[];
		is_muted: boolean;
	}

	export interface User {
		id: number;
		name: string;
		account: string;
		profile_image_urls: ProfileImageUrls;
		is_followed: boolean;
		is_access_blocking_user: boolean;
	}

	export interface ProfileImageUrls {
		medium: string;
	}

	export interface UserDetail {
		user: User;
		profile: Profile;
		profile_publicity: ProfilePublicity;
		workspace: {
			[key: string]: null | string;
			workspace_image_url: null | string;
		};
	}

	export interface Profile {
		webpage?: string;
		gender: string;
		birth: string;
		birth_day: string;
		birth_year: number;
		region: string;
		address_id: number;
		country_code: string;
		job: string;
		job_id: number;
		total_follow_users: number;
		total_mypixiv_users: number;
		total_illusts: number;
		total_manga: number;
		total_novels: number;
		total_illust_bookmarks_public: number;
		total_illust_series: number;
		total_novel_series: number;
		background_image_url: string;
		twitter_account: string;
		twitter_url?: string;
		pawoo_url?: string;
		is_premium: boolean;
		is_using_custom_profile_image: boolean;
	}

	export interface ProfilePublicity {
		gender: Visibility;
		region: Visibility;
		birth_day: Visibility;
		birth_year: Visibility;
		job: Visibility;
		pawoo: boolean;
	}

	export interface ProfileImageUrls {
		medium: string;
	}

	export interface Follow {
		follow_detail: FollowDetail;
	}

	export interface FollowDetail {
		is_followed: false;
		restrict: string;
	}
}
