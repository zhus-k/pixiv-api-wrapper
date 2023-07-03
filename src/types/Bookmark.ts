import type { CamelCasedPropertiesDeep } from 'type-fest';
import { Visibility } from './SearchParameterOptions';

export type BookmarkDetail = CamelCasedPropertiesDeep<Bookmark_Detail>;
export type BookmarkTag = CamelCasedPropertiesDeep<Bookmark_Tag>;
export type BookmarkTags = CamelCasedPropertiesDeep<Bookmark_Tags>;
export type BookmarkRanges = CamelCasedPropertiesDeep<Bookmark_Ranges>;

interface Bookmark_Detail {
	bookmark_detail: {
		is_bookmarked: boolean;
		tags: Tag_[];
		restrict: Visibility;
	};
}

interface Tag_ {
	name: string;
	is_registered: boolean;
}

interface Bookmark_Tags {
	bookmark_tags: Bookmark_Tag[];
}

interface Bookmark_Tag {
	name: string;
	count: number;
}

interface Bookmark_Ranges {
	bookmark_ranges: {
		bookmark_num_min: string;
		bookmark_num_max: string;
	}[];
}
