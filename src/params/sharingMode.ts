import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((mode): mode is 'by-me' | 'with-me' => {
    return mode === 'by-me' || mode === 'with-me';
}) satisfies ParamMatcher;