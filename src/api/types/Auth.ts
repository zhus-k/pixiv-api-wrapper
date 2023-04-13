import { CamelCasedPropertiesDeep } from 'type-fest';

export type Auth = CamelCasedPropertiesDeep<Response.Auth>;

export namespace Response {
	export interface Auth {
		access_token: string;
		expires_in: number;
		token_type: string;
		scope: string;
		refresh_token: string;
		user: User;
		response: Auth;
	}

	export interface User {
		profile_image_urls: ProfileImageUrls;
		id: string;
		name: string;
		account: string;
		mail_address: string;
		is_premium: boolean;
		x_restrict: number;
		is_mail_authorized: boolean;
		require_policy_agreement: boolean;
	}

	export interface ProfileImageUrls {
		px_16x16: string;
		px_50x50: string;
		px_170x170: string;
	}
}
