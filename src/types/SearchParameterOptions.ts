export type Type = 'illust' | 'manga' | 'ugoira';

export type Duration =
	| 'within_last_day'
	| 'within_last_month'
	| 'within_last_week';

export type Mode =
	| 'day'
	| 'day_female'
	| 'day_female_r18'
	| 'day_male'
	| 'day_male_r18'
	| 'day_manga'
	| 'day_r18'
	| 'day_r18_manga'
	| 'month'
	| 'month_manga'
	| 'week'
	| 'week_manga'
	| 'week_original'
	| 'week_r18'
	| 'week_r18_manga'
	| 'week_r18g'
	| 'week_r18g_manga'
	| 'week_rookie'
	| 'week_rookie_manga';

export type Size = 'square_medium' | 'large' | 'original' | 'medium';

export type Sort =
	| 'date_asc'
	| 'date_desc'
	| 'popular_desc'
	| 'popular_female_desc'
	| 'popular_male_desc';

export type Visibility = 'private' | 'public';
export type AllVisibility = 'all' | Visibility;

export type SearchTarget =
	| 'exact_match_for_tags'
	| 'partial_match_for_tags'
	| 'title_and_caption';

export type Id = string | number;

export type Bookmarks =
	| '0'
	| '50'
	| '100'
	| '300'
	| '500'
	| '1000'
	| '3000'
	| '5000'
	| '10000';

export type SearchParameterOptions = Partial<{
	alreadyRecommended: string;
	bookmarks: Bookmarks;
	category: string;
	contentType: string;
	duration: Duration;
	endDate: string;
	filter: 'for_ios';
	illustId: Id;
	includePrivacyPolicy: boolean;
	includeRankingIllusts: boolean;
	includeRankingLabel: boolean;
	includeRankingNovels: boolean;
	includeTotalComments: boolean;
	maxBookmarkId: Id;
	maxBookmarkIdForRecommend: number;
	maxIllustId: Id;
	maxNovelId: Id;
	minBookmarkIdForRecentIllust: number;
	mode: Mode;
	novelId: Id;
	offset: string | number;
	parentCommentId: Id;
	r18: boolean;
	restrict: AllVisibility;
	searchTarget: SearchTarget;
	seriesId: Id;
	sort: Sort;
	startDate: string;
	type: Type;
	userId: Id;
	word: string;
}>;
