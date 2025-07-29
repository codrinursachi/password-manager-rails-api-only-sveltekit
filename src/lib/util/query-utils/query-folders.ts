import { networkFetch } from '../network-utils/network-fetch';

export async function queryFolders(
	fetch: {
		(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
		(input: string | URL | globalThis.Request, init?: RequestInit): Promise<Response>;
	},
	signal: AbortSignal | null | undefined
) {
	const response = await networkFetch('folders', signal, undefined, undefined, fetch);

	return { folders: response };
}
