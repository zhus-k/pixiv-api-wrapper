import { CamelCasedPropertiesDeep } from 'type-fest';
import { Visibility } from './SearchParameterOptions';

export type BookmarkDetail = CamelCasedPropertiesDeep<Response.BookmarkDetail>;
export type BookmarkTag = CamelCasedPropertiesDeep<Response.BookmarkTag>;
export type BookmarkTags = CamelCasedPropertiesDeep<Response.BookmarkTags>;
export type BookmarkRanges = CamelCasedPropertiesDeep<Response.BookmarkRanges>;

export namespace Response {
	export interface BookmarkDetail {
		bookmark_detail: {
			is_bookmarked: boolean;
			tags: Tag[];
			restrict: Visibility;
		};
	}

	export interface Tag {
		name: string;
		is_registered: boolean;
	}

	export interface BookmarkTags {
		bookmark_tags: BookmarkTag[];
	}

	export interface BookmarkTag {
		name: string;
		count: number;
	}

	export interface BookmarkRanges {
		bookmark_ranges: {
			bookmark_num_min: string;
			bookmark_num_max: string;
		}[];
	}
}
