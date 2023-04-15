import type { CamelCasedPropertiesDeep } from 'type-fest';

export type Comments = CamelCasedPropertiesDeep<Response.Comments>;

export namespace Response {
	export interface Comments {
		total_comments: number;
		comments: Comment[];
		next_url: string | null;
		comment_access_control: number;
	}

	export interface Comment {
		id: number;
		comment: string;
		date: string;
		user: User;
		parent_comment: ParentComment;
	}

	export interface ParentComment {}

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
