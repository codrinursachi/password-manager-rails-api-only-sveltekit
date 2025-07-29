import { queryLogin } from '$lib/util/query-utils/query-login';
import { queryLogins } from '$lib/util/query-utils/query-logins';
import type { PageLoad } from './$types';

export const load = (async ({ url, fetch, params }) => {
	const [logins, individualLogin] = await Promise.all([
		queryLogins(url.searchParams.toString() || '', null, fetch),
		params.loginId ? queryLogin(params.loginId, null, fetch) : undefined
	]);
	return { logins: logins.logins, individualLogin: individualLogin?.individualLogin };
}) satisfies PageLoad;
