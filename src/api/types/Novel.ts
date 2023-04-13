import { CamelCasedPropertiesDeep } from 'type-fest';
import { User } from './User';

export type NovelDetail = CamelCasedPropertiesDeep<Response.NovelDetail>;
export type Novel = CamelCasedPropertiesDeep<Response.Novel>;
export type Novels = CamelCasedPropertiesDeep<Response.Novels>;
export type NovelText = CamelCasedPropertiesDeep<Response.NovelText>;
export type NovelSearch = CamelCasedPropertiesDeep<Response.NovelSearch>;
export type UserNovel = CamelCasedPropertiesDeep<Response.UserNovel>;
export type RecommendedNovels =
	CamelCasedPropertiesDeep<Response.RecommendedNovels>;
export type NovelPopularPreviewSearch =
	CamelCasedPropertiesDeep<Response.NovelPopularPreviewSearch>;

export namespace Response {
	export interface NovelSearch extends Novels {
		searchSpanLimit: number;
	}

	export interface RecommendedNovels extends Novels {
		ranking_novels: [];
		privacy_policy: {};
	}

	export interface NovelPopularPreviewSearch
		extends Omit<NovelSearch, 'next_url'> {}

	export interface UserNovel extends Novels {
		user: User;
	}

	export interface Novels {
		novels: Novel[];
		next_url?: string;
	}

	export interface NovelDetail {
		novel: Novel;
	}

	export interface Novel {
		id: number;
		title: string;
		caption: string;
		restrict: number;
		x_restrict: number;
		is_original: boolean;
		image_urls: ImageUrls;
		create_date: string;
		tags: Tag[];
		page_count: number;
		text_length: number;
		user: Omit<User, 'is_access_blocking_user'>;
		series?: Series;
		is_bookmarked: boolean;
		total_bookmarks: number;
		total_view: number;
		visible: boolean;
		total_comments: number;
		is_muted: boolean;
		is_mypixiv_only: boolean;
		is_x_restricted: boolean;
		novel_ai_type: number;
	}

	export interface ImageUrls {
		square_medium: string;
		medium: string;
		large: string;
	}

	export interface Series {
		id: number;
		title: string;
	}

	export interface Tag {
		name: string;
		translated_name?: string;
		added_by_uploaded_user: boolean;
	}

	export interface NovelText {
		novel_marker: NovelMarker;
		novel_text: string;
		series_prev: Novel;
		series_next: Novel;
	}

	export interface NovelMarker {}
}
