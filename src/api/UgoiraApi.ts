import { AuthClient } from '../auth/AuthClient';
import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { SearchParameterOptions } from './types/SearchParameterOptions';
import { Ugoira } from './types/Ugoira';

type Params = Pick<SearchParameterOptions, 'illustId'>;

export class UgoiraApi extends HttpBase {
	constructor(auth: AuthClient) {
		super(auth);
	}

	async metadata(id: string | number) {
		const response = await this.request<Params>('GET', '/v1/ugoira/metadata', {
			searchParams: {
				illustId: id,
			},
		});
		return snakeToCamelCase<Ugoira>(response);
	}
}
