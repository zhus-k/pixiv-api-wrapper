import { AuthClient } from '../auth/AuthClient';
import { snakeToCamelCase } from '../helpers';
import { HttpBase } from './HttpBase';
import { TrendingTags } from './types/TrendingTags';

export class TrendingTagsApi extends HttpBase {
	constructor(auth: AuthClient) {
		super(auth);
	}

	async illust() {
		const response = await this.request('GET', '/v1/trending-tags/illust');
		return snakeToCamelCase<TrendingTags>(response);
	}

	async novel() {
		const response = await this.request('GET', '/v1/trending-tags/novel');
		return snakeToCamelCase<TrendingTags>(response);
	}
}
