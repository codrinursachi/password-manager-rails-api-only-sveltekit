import { networkFetch } from '../network-utils/network-fetch';

export async function queryLogins(
	queryParameters: string,
	signal: AbortSignal | null | undefined,
	fetch?: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	}
) {
	const response = await networkFetch(
		`logins?${queryParameters}`,
		signal,
		undefined,
		undefined,
		fetch
	);

	return {
		logins: response
	};
}
