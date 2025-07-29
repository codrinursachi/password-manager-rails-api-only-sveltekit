<script lang="ts">
	import LoginDialog from '$lib/components/logins/login-dialog.svelte';
	import TrashedLoginsTable from '$lib/components/trashed-logins/trashed-logins-table.svelte';

	const { data } = $props();
</script>

<div class="flex flex-col gap-4">
	<h1>Trash Page</h1>
	<LoginDialog data={{ folders: data.folders, individualLogin: data.individualLogin }} />
	<TrashedLoginsTable data={data.trashedLogins} />
</div>
