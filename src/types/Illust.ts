import type { CamelCasedPropertiesDeep } from 'type-fest';
import { Type as Type_ } from './SearchParameterOptions';
import { User as User_ } from './User';

export type IllustDetail = CamelCasedPropertiesDeep<Illust_Detail>;
export type Illust = CamelCasedPropertiesDeep<Illust_>;
export type Illusts = CamelCasedPropertiesDeep<Illusts_>;
export type IllustSearch = CamelCasedPropertiesDeep<Illust_Search>;
export type IllustsPopularPreviewSearch =
	CamelCasedPropertiesDeep<Illusts_Popular_Preview_Search>;
export type RecommendedIllusts = CamelCasedPropertiesDeep<Recommended_Illusts>;
export type RecommendedManga = CamelCasedPropertiesDeep<Recommended_Manga>;

interface Illust_Search extends Illusts_ {
	search_span_limit: number;
}

interface Illusts_Popular_Preview_Search
	extends Omit<Illust_Search, 'next_url'> {}

interface Recommended_Manga
	extends Omit<Recommended_Illusts, 'contest_exists'> {}

interface Recommended_Illusts extends Illusts_ {
	ranking_illusts: [];
	contest_exists: boolean;
	privacy_policy: {};
}

interface Illusts_ {
	illusts: Illust_[];
	next_url: string | null;
}

interface Illust_Detail {
	illust: Illust_;
}

interface Illust_ {
	id: number;
	title: string;
	type: Type_;
	image_urls: Image_Urls;
	caption: string;
	restrict: number;
	user: Omit<User_, 'is_access_blocking_user'>;
	tags: Tag_[];
	tools: string[];
	create_date: string;
	page_count: number;
	width: number;
	height: number;
	sanity_level: number;
	x_restrict: number;
	series?: Series_;
	meta_single_page: Meta_Single_Page;
	meta_pages: Meta_Page[];
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

interface Image_Urls {
	square_medium: string;
	medium: string;
	large: string;
}

interface Series_ {
	id: number;
	title: string;
}

interface Meta_Page_Image_Urls extends Image_Urls {
	original: string;
}

interface Meta_Page {
	image_urls: Meta_Page_Image_Urls;
}

interface Meta_Single_Page {
	original_image_url?: string;
}

interface Tag_ {
	name: string;
	translated_name?: string;
}
