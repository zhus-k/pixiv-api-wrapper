import type { CamelCasedPropertiesDeep } from 'type-fest';

export type Ugoira = CamelCasedPropertiesDeep<Ugoira_>;

interface Ugoira_ {
	ugoira_metadata: Ugoira_Metadata;
}

interface Ugoira_Metadata {
	zip_urls: Zip_Urls;
	frames: Frame_[];
}

interface Frame_ {
	file: string;
	delay: number;
}

interface Zip_Urls {
	medium: string;
}
