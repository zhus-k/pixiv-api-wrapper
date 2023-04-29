import { AuthClient } from '../auth/AuthClient';
import { apiOrigin } from '../constants/constants';
import { buildBaseApi } from '../helpers';

// why did i do this
export abstract class HttpBase {
	protected request;
	constructor(protected authClient: AuthClient) {
		const { hostname } = new URL(apiOrigin);
		this.request = buildBaseApi({
			hostname,
			headers: {
				Authorization: this.authClient.getAuthentication().accessToken
					? `Bearer ${this.authClient.getAuthentication().accessToken}`
					: undefined,
			},
		});
	}
}
