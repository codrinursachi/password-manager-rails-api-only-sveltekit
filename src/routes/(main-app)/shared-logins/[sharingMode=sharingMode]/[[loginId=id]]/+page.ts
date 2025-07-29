import { queryLogin } from '$lib/util/query-utils/query-login';
import { querySharedLogins } from '$lib/util/query-utils/query-shared-logins';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	while (true) {
		try {
			const [sharedLogins, individualLogin] = await Promise.all([
				querySharedLogins(params.sharingMode === 'by-me' ? 'by_me=true' : '', null, fetch),
				params.loginId ? queryLogin(params.loginId, null, fetch) : undefined
			]);
			return {
				sharedLogins: sharedLogins.sharedLogins,
				individualLogin: individualLogin?.individualLogin
			};
		} catch {
			await new Promise((resolve) => setTimeout(resolve, 500));
			continue;
		}
	}
}) satisfies PageLoad;
