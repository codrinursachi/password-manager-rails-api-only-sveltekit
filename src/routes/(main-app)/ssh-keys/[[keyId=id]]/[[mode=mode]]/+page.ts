import { querySSHKey } from '$lib/util/query-utils/query-ssh-key';
import { querySSHKeys } from '$lib/util/query-utils/query-ssh-keys';
import type { PageLoad } from './$types';

export const load = (async ({ fetch, params }) => {
	const [SSHKeys, individualSSHKey] = await Promise.all([
		querySSHKeys(null, fetch),
		params.keyId ? querySSHKey(params.keyId, null, fetch) : undefined
	]);
	return {
		SSHKeys: SSHKeys.sshKeys,
		individualSSHKey: individualSSHKey?.individualSSHKey
	};
}) satisfies PageLoad;
