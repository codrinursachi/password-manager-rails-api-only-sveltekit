import { getAuthToken } from '$lib/util/auth';
import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ url }) => {
	if (url.pathname !== '/login' && url.pathname !== '/register') {
		try {
			getAuthToken();
		} catch {
			throw redirect(302, '/login');
		}
	}
}) satisfies LayoutLoad;
