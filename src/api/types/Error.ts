import { CamelCasedPropertiesDeep } from 'type-fest';

export type Error = CamelCasedPropertiesDeep<Response.Error>;

export namespace Response {
	export interface Error {
		error: {
			user_message: string;
			message: string;
			reason: string;
			user_message_details: {};
		};
	}
}
