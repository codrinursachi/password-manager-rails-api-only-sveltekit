import { queryFolders } from '$lib/util/query-utils/query-folders';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
	const data = await queryFolders(fetch, null);
	return data;
}) satisfies LayoutLoad;
