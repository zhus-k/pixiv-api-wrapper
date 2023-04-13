import { CamelCasedPropertiesDeep } from 'type-fest';

export type Autocomplete = CamelCasedPropertiesDeep<Response.Autocomplete>;
export type AutocompleteV2 = CamelCasedPropertiesDeep<Response.AutocompleteV2>;

export namespace Response {
	export interface Autocomplete {
		search_auto_complete_keywords: string[];
	}

	export interface AutocompleteV2 {
		tags: Tag[];
	}

	export interface Tag {
		name: string;
		translated_name?: string;
	}
}
