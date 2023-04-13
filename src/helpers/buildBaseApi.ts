import { OutgoingHttpHeaders } from 'node:http';
import https, { RequestOptions } from 'node:https';
import { URLSearchParams } from 'node:url';
import { camelToSnakeCase, httpRequest } from '.';
import { userAgent } from '../constants/constants';

export function buildBaseApi(baseOptions: RequestOptions) {
	return async function <S extends Record<string, any>, T = any>(
		method: string,
		path: string = '',
		{
			headers,
			searchParams,
			data,
		}: {
			headers?: OutgoingHttpHeaders;
			searchParams?: S;
			data?: any;
		} = {},
	) {
		// Parse Search Parameters if any
		searchParams && (path += processSearchParams(searchParams));
		console.log(method.padEnd(6), path);

		const request = https.request({
			...baseOptions,
			method,
			path,
			headers: {
				'User-Agent': userAgent,
				...baseOptions.headers,
				...headers,
			},
		});

		return await httpRequest<T>(request, data);
	};
}

export function processSearchParams(searchParams?: Record<string, any>) {
	if (!searchParams) return '';
	const params = new URLSearchParams();
	const casedParams = camelToSnakeCase(searchParams);
	for (const k of Object.keys(casedParams)) {
		if (casedParams[k] !== undefined) {
			params.set(k, `${casedParams[k]}`);
		}
	}
	return `?${params.toString()}`;
}
