import { queryLogin } from '$lib/util/query-utils/query-login';
import { querySharedLogins } from '$lib/util/query-utils/query-shared-logins';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const [sharedLogins, individualLogin] = await Promise.all([
		querySharedLogins(params.sharingMode === 'by-me' ? 'by_me=true' : '', null, fetch),
		params.loginId ? queryLogin(params.loginId, null, fetch) : undefined
	]);
	return {
		sharedLogins: sharedLogins.sharedLogins,
		individualLogin: individualLogin?.individualLogin
	};
}) satisfies PageLoad;
