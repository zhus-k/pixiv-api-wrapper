import { env } from 'node:process';
import { PixivApi } from '../src';

let client!: PixivApi;
let userId!: string;

export default (async () => {
	if (!client) {
		client = await PixivApi.create(env.PIXIV_RT ?? '');
		userId = client.Auth.getAuthentication().user.id;
	}
})();

export { client, userId };
