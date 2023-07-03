import type { CamelCasedPropertiesDeep } from 'type-fest';

export type CommentsV2 = CamelCasedPropertiesDeep<Comments_V2>;

interface Comments_V2 {
	comments: Comment_V2[];
	next_url: string | null;
	comment_access_control: number;
}

interface Comment_V2 {
	id: number;
	comment: string;
	date: string;
	user: User_;
	has_replies: boolean;
}

interface User_ {
	id: number;
	name: string;
	account: string;
	profile_image_urls: Profile_Image_Urls;
}

interface Profile_Image_Urls {
	medium: string;
}
