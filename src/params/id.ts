import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((id): id is string => {
	return !isNaN(+id);
}) satisfies ParamMatcher;
