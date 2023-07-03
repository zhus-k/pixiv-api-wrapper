import type { CamelCasedPropertiesDeep } from 'type-fest';
import { Illust as Illust_ } from './Illust';
import { Novel as Novel_ } from './Novel';
import { Visibility as Visibility_ } from './SearchParameterOptions';

export type User = CamelCasedPropertiesDeep<User_>;
export type Users = CamelCasedPropertiesDeep<Users_>;
export type UserDetail = CamelCasedPropertiesDeep<User_Detail>;
export type RecommendedUser = CamelCasedPropertiesDeep<Recommended_User>;
export type Follow = CamelCasedPropertiesDeep<Follow_>;

interface Recommended_User {
	user_previews: User_Preview;
	next_url: string | null;
}

interface Users_ {
	user_previews: User_Preview[];
	next_url: string | null;
}

interface User_Preview {
	user: User_;
	illusts: Illust_[];
	novels: Novel_[];
	is_muted: boolean;
}

interface User_ {
	id: number;
	name: string;
	account: string;
	profile_image_urls: Profile_Image_Urls;
	is_followed: boolean;
	is_access_blocking_user: boolean;
}

interface Profile_Image_Urls {
	medium: string;
}

interface User_Detail {
	user: User_;
	profile: Profile_;
	profile_publicity: Profile_Publicity;
	workspace: {
		[key: string]: null | string;
		workspace_image_url: null | string;
	};
}

interface Profile_ {
	webpage?: string;
	gender: string;
	birth: string;
	birth_day: string;
	birth_year: number;
	region: string;
	address_id: number;
	country_code: string;
	job: string;
	job_id: number;
	total_follow_users: number;
	total_mypixiv_users: number;
	total_illusts: number;
	total_manga: number;
	total_novels: number;
	total_illust_bookmarks_public: number;
	total_illust_series: number;
	total_novel_series: number;
	background_image_url: string;
	twitter_account: string;
	twitter_url?: string;
	pawoo_url?: string;
	is_premium: boolean;
	is_using_custom_profile_image: boolean;
}

interface Profile_Publicity {
	gender: Visibility_;
	region: Visibility_;
	birth_day: Visibility_;
	birth_year: Visibility_;
	job: Visibility_;
	pawoo: boolean;
}

interface Profile_Image_Urls {
	medium: string;
}

interface Follow_ {
	follow_detail: Follow_Detail;
}

interface Follow_Detail {
	is_followed: false;
	restrict: string;
}
