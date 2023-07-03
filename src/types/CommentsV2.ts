import type { CamelCasedPropertiesDeep } from 'type-fest';

export type CommentsV2 = CamelCasedPropertiesDeep<Response.CommentsV2>;

export namespace Response {
	export interface CommentsV2 {
		comments: CommentV2[];
		next_url: string | null;
		comment_access_control: number;
	}

	export interface CommentV2 {
		id: number;
		comment: string;
		date: string;
		user: User;
		has_replies: boolean;
	}

	export interface User {
		id: number;
		name: string;
		account: string;
		profile_image_urls: ProfileImageUrls;
	}

	export interface ProfileImageUrls {
		medium: string;
	}
}
