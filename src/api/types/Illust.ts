import { CamelCasedPropertiesDeep } from 'type-fest';
import { Type } from './SearchParameterOptions';
import { User } from './User';

export type IllustDetail = CamelCasedPropertiesDeep<Response.IllustDetail>;
export type Illust = CamelCasedPropertiesDeep<Response.Illust>;
export type Illusts = CamelCasedPropertiesDeep<Response.Illusts>;
export type IllustSearch = CamelCasedPropertiesDeep<Response.IllustSearch>;
export type IllustsPopularPreviewSearch =
	CamelCasedPropertiesDeep<Response.IllustsPopularPreviewSearch>;
export type RecommendedIllusts =
	CamelCasedPropertiesDeep<Response.RecommendedIllusts>;
export type RecommendedManga =
	CamelCasedPropertiesDeep<Response.RecommendedManga>;

export namespace Response {
	export interface IllustSearch extends Illusts {
		search_span_limit: number;
	}

	export interface IllustsPopularPreviewSearch
		extends Omit<IllustSearch, 'next_url'> {}

	export interface RecommendedManga
		extends Omit<RecommendedIllusts, 'contest_exists'> {}

	export interface RecommendedIllusts extends Illusts {
		ranking_illusts: [];
		contest_exists: boolean;
		privacy_policy: {};
	}

	export interface Illusts {
		illusts: Illust[];
		next_url?: string;
	}

	export interface IllustDetail {
		illust: Illust;
	}

	export interface Illust {
		id: number;
		title: string;
		type: Type;
		image_urls: ImageUrls;
		caption: string;
		restrict: number;
		user: Omit<User, 'is_access_blocking_user'>;
		tags: Tag[];
		tools: string[];
		create_date: string;
		page_count: number;
		width: number;
		height: number;
		sanity_level: number;
		x_restrict: number;
		series?: Series;
		meta_single_page: MetaSinglePage;
		meta_pages: MetaPage[];
		total_view: number;
		total_bookmarks: number;
		is_bookmarked: boolean;
		visible: boolean;
		is_muted: boolean;
		total_comments: number;
		illust_ai_type: number;
		illust_book_style: number;
		comment_access_control: number;
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

	export interface MetaPageImageUrls extends ImageUrls {
		original: string;
	}

	export interface MetaPage {
		image_urls: MetaPageImageUrls;
	}

	export interface MetaSinglePage {
		original_image_url: string;
	}

	export interface Tag {
		name: string;
		translated_name?: string;
	}
}
