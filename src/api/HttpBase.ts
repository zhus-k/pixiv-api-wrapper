import { AuthClient } from '../auth/AuthClient';
import { apiOrigin } from '../constants/constants';
import { buildBaseApi } from '../helpers';

// why did i do this
export abstract class HttpBase {
	constructor(protected authClient: AuthClient) {}

	protected get request() {
		const { hostname } = new URL(apiOrigin);
		return buildBaseApi({
			hostname,
			headers: {
				Authorization: `Bearer ${
					this.authClient.getAuthentication().accessToken
				}`,
			},
		});
	}
}
