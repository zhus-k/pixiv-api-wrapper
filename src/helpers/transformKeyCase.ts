import { CamelCasedPropertiesDeep, SnakeCasedPropertiesDeep } from 'type-fest';

export function snakeToCamelCase<T = any>(
	obj: any,
): CamelCasedPropertiesDeep<T> {
	if (Array.isArray(obj)) {
		return obj.map(snakeToCamelCase) as CamelCasedPropertiesDeep<T>;
	} else if (obj !== null && typeof obj === 'object') {
		return Object.keys(obj).reduce((result, key) => {
			const value = obj[key];
			const camelKey = key.replace(/_([0-9a-z])/g, (_, p1) => p1.toUpperCase());
			result[camelKey] = snakeToCamelCase(value);
			return result;
		}, {} as any);
	} else {
		return obj as CamelCasedPropertiesDeep<T>;
	}
}

export function camelToSnakeCase<T = any>(
	obj: any,
): SnakeCasedPropertiesDeep<T> {
	if (Array.isArray(obj)) {
		return obj.map(camelToSnakeCase) as SnakeCasedPropertiesDeep<T>;
	} else if (obj !== null && typeof obj === 'object') {
		return Object.keys(obj).reduce((result, key) => {
			const value = obj[key];
			const camelKey = key.replace(/[0-9A-Z]/g, (c) => `_${c}`).toLowerCase();
			result[camelKey] = snakeToCamelCase(value);
			return result;
		}, {} as any);
	} else {
		return obj as SnakeCasedPropertiesDeep<T>;
	}
}
