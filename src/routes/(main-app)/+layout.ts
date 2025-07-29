import { queryFolders } from '$lib/util/query-utils/query-folders';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
	while (true) {
		try {
			const folders = await queryFolders(fetch, null);
			return folders;
		} catch {
			await new Promise((resolve) => setTimeout(resolve, 500));
			continue;
		}
	}
}) satisfies LayoutLoad;
