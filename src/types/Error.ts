import type { CamelCasedPropertiesDeep } from 'type-fest';

export type ApiError = CamelCasedPropertiesDeep<Error_>;
export type AuthError = CamelCasedPropertiesDeep<Auth_Error>;

interface Error_ {
	error: {
		user_message: string;
		message: string;
		reason: string;
		user_message_details: {};
	};
}

interface Auth_Error {
	has_error: true;
	errors: {
		system: {
			message: string;
			code: number;
		};
	};
	error: string;
}
