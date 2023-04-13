import { CamelCasedPropertiesDeep } from 'type-fest';

export type Ugoira = CamelCasedPropertiesDeep<Response.Ugoira>;

export namespace Response {
	export interface Ugoira {
		ugoira_metadata: UgoiraMetadata;
	}

	export interface UgoiraMetadata {
		zip_urls: ZipUrls;
		frames: Frame[];
	}

	export interface Frame {
		file: string;
		delay: number;
	}

	export interface ZipUrls {
		medium: string;
	}
}
