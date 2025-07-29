import { redirect, type Handle } from '@sveltejs/kit';

export const handle:Handle = async ({ event, resolve }) => {
	if (
		!event.request.headers.get('Authorization') &&
		event.url.pathname !== '/login' &&
		event.url.pathname !== '/register'
	) {
		redirect(307, '/login');
	}
	const response = await resolve(event);
	return response;
};
