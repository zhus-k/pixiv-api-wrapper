import { CamelCasedPropertiesDeep } from 'type-fest';
import { Illust } from './Illust';

export type TrendingTags = CamelCasedPropertiesDeep<Response.TrendingTags>;

export namespace Response {
	export interface TrendingTags {
		trend_tags: TrendTag[];
	}

	export interface TrendTag {
		tag: string;
		translated_name?: string;
		illust: TrendTagIllust;
	}

	export interface TrendTagIllust
		extends Omit<Illust, 'total_comments' | 'comment_access_control'> {}
}
