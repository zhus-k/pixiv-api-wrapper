import type { CamelCasedPropertiesDeep } from 'type-fest';
import { User as User_ } from './User';

export type NovelDetail = CamelCasedPropertiesDeep<Novel_Detail>;
export type Novel = CamelCasedPropertiesDeep<Novel_>;
export type Novels = CamelCasedPropertiesDeep<Novels_>;
export type NovelText = CamelCasedPropertiesDeep<Novel_Text>;
export type NovelSearch = CamelCasedPropertiesDeep<Novel_Search>;
export type UserNovel = CamelCasedPropertiesDeep<User_Novel>;
export type RecommendedNovels = CamelCasedPropertiesDeep<Recommended_Novels>;
export type NovelPopularPreviewSearch =
	CamelCasedPropertiesDeep<Novel_Popular_Preview_Search>;

interface Novel_Search extends Novels_ {
	searchSpanLimit: number;
}

interface Recommended_Novels extends Novels_ {
	ranking_novels: [];
	privacy_policy: {};
}

interface Novel_Popular_Preview_Search extends Omit<Novel_Search, 'next_url'> {}

interface User_Novel extends Novels_ {
	user: User_;
}

interface Novels_ {
	novels: Novel_[];
	next_url: string | null;
}

interface Novel_Detail {
	novel: Novel_;
}

interface Novel_ {
	id: number;
	title: string;
	caption: string;
	restrict: number;
	x_restrict: number;
	is_original: boolean;
	image_urls: Image_Urls;
	create_date: string;
	tags: Tag_[];
	page_count: number;
	text_length: number;
	user: Omit<User_, 'is_access_blocking_user'>;
	series?: Series_;
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

interface Image_Urls {
	square_medium: string;
	medium: string;
	large: string;
}

interface Series_ {
	id: number;
	title: string;
}

interface Tag_ {
	name: string;
	translated_name?: string;
	added_by_uploaded_user: boolean;
}

interface Novel_Text {
	novel_marker: Novel_Marker;
	novel_text: string;
	series_prev: Novel_;
	series_next: Novel_;
}

interface Novel_Marker {}
