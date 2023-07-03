import { HttpBase } from './HttpBase';
import { SearchParameterOptions } from '../types/SearchParameterOptions';
import { Ugoira } from '../types/Ugoira';

type Params = Pick<SearchParameterOptions, 'illustId'>;

export class UgoiraApi extends HttpBase {
	async metadata(id: string | number): Promise<Ugoira> {
		return await this.request<Params>('GET', '/v1/ugoira/metadata', {
			searchParams: {
				illustId: id,
			},
		});
	}
}
