import { getAuthToken } from '../auth';

export async function networkFetch(
	address: string,
	signal?: AbortSignal | null,
	method: string = 'GET',
	body?: FormData | null,
	svelteFetch?: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	}
) {
	const netFetch = svelteFetch || fetch;
	const response = await netFetch('/api/v1/' + address, {
		signal,
		method,
		headers: {
			Accept: 'application/json',
			Authorization: getAuthToken() || ''
		},
		body
	});

	if (!response.ok) {
		throw new Error(
			`Error: ${await response.json().then((data) => data.error || 'Unknown error')}`
		);
	}

	return method !== 'DELETE' && response.json();
}
