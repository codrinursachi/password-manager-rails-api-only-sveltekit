<script lang="ts">
	import LoginDialog from '$lib/components/logins/login-dialog.svelte';
	import SharedLoginsTable from '$lib/components/shared-logins/shared-logins-table.svelte';

	const { data } = $props();
</script>

<div class="flex flex-col gap-4">
	<h1>Shared Logins</h1>
	<LoginDialog data={{ folders: data.folders, individualLogin: data.individualLogin }} />
	<SharedLoginsTable data={data.sharedLogins} />
</div>
