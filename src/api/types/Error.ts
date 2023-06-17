import type { CamelCasedPropertiesDeep } from 'type-fest';

export type ApiError = CamelCasedPropertiesDeep<Response.ApiError>;
export type AuthError = CamelCasedPropertiesDeep<Response.AuthError>;

export namespace Response {
	export interface ApiError {
		error: {
			user_message: string;
			message: string;
			reason: string;
			user_message_details: {};
		};
	}
	export interface AuthError {
		has_error: true;
		errors: {
			system: {
				message: string;
				code: number;
			};
		};
		error: string;
	}
}
