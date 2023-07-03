import type { CamelCasedPropertiesDeep } from 'type-fest';

export type Autocomplete = CamelCasedPropertiesDeep<Autocomplete_>;
export type AutocompleteV2 = CamelCasedPropertiesDeep<AutocompleteV2_>;

interface Autocomplete_ {
	search_auto_complete_keywords: string[];
}

interface AutocompleteV2_ {
	tags: Tag_[];
}

interface Tag_ {
	name: string;
	translated_name?: string;
}
