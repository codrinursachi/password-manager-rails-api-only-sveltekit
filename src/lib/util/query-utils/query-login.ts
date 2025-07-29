import { networkFetch } from '../network-utils/network-fetch';

export async function queryLogin(
	loginId: string,
	signal: AbortSignal | null | undefined,
	fetch?: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	}
) {
	const response = await networkFetch('logins/' + loginId, signal, undefined, undefined, fetch);
	return {
		individualLogin: response
	};
}
