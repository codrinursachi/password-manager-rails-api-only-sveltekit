import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((mode): mode is 'new' | 'edit' => {
	return mode === 'new' || mode === 'edit';
}) satisfies ParamMatcher;
