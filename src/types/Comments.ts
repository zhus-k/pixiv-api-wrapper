import type { CamelCasedPropertiesDeep } from 'type-fest';

export type Comments = CamelCasedPropertiesDeep<Comments_>;

interface Comments_ {
	total_comments: number;
	comments: Comment_[];
	next_url: string | null;
	comment_access_control: number;
}

interface Comment_ {
	id: number;
	comment: string;
	date: string;
	user: User_;
	parent_comment: Parent_Comment;
}

interface Parent_Comment {}

interface User_ {
	id: number;
	name: string;
	account: string;
	profile_image_urls: Profile_Image_Urls;
}

interface Profile_Image_Urls {
	medium: string;
}
