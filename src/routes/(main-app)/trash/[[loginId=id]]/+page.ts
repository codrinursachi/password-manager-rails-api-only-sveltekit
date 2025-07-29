import { queryLogin } from '$lib/util/query-utils/query-login';
import { queryTrashedLogins } from '$lib/util/query-utils/query-trashed-logins';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const [trashedLogins, individualLogin] = await Promise.all([
		queryTrashedLogins(null, fetch),
		params.loginId ? queryLogin(params.loginId, null, fetch) : undefined
	]);
	return {
		trashedLogins: trashedLogins.trashedLogins,
		individualLogin: individualLogin?.individualLogin
	};
}) satisfies PageLoad;
