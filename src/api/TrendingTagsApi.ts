import { HttpBase } from './HttpBase';
import { TrendingTags } from './types/TrendingTags';

export class TrendingTagsApi extends HttpBase {
	async illust(): Promise<TrendingTags> {
		return await this.request('GET', '/v1/trending-tags/illust');
	}

	async novel(): Promise<TrendingTags> {
		return await this.request('GET', '/v1/trending-tags/novel');
	}
}
