import { networkFetch } from '../network-utils/network-fetch';

export async function querySharedLogins(
	queryParameter: string,
	signal: AbortSignal | null | undefined,
	fetch?: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	}
) {
	const response = await networkFetch(
		'shared_login_data?' + queryParameter,
		signal,
		undefined,
		undefined,
		fetch
	);

	return {
		sharedLogins: response
	};
}
