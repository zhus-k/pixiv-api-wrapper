import type { CamelCasedPropertiesDeep } from 'type-fest';
import { Illust as Illust_ } from './Illust';

export type TrendingTags = CamelCasedPropertiesDeep<Trending_Tags>;

interface Trending_Tags {
	trend_tags: Trend_Tag[];
}

interface Trend_Tag {
	tag: string;
	translated_name?: string;
	illust: Trend_Tag_Illust;
}

interface Trend_Tag_Illust
	extends Omit<Illust_, 'total_comments' | 'comment_access_control'> {}
