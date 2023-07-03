import type { CamelCasedPropertiesDeep } from 'type-fest';

export type Auth = CamelCasedPropertiesDeep<Auth_>;

type Response_ = Omit<Auth_, 'response'>;

interface Auth_ {
	access_token: string;
	expires_in: number;
	token_type: string;
	scope: string;
	refresh_token: string;
	user: User_;
	response: Response_;
}

interface User_ {
	profile_image_urls: Profile_Image_Urls;
	id: string;
	name: string;
	account: string;
	mail_address: string;
	is_premium: boolean;
	x_restrict: number;
	is_mail_authorized: boolean;
	require_policy_agreement: boolean;
}

interface Profile_Image_Urls {
	px_16x16: string;
	px_50x50: string;
	px_170x170: string;
}
