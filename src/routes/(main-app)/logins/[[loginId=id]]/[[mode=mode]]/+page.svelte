<script lang="ts">
	import { goto } from '$app/navigation';
	import LoginDialog from '$lib/components/logins/login-dialog.svelte';
	import LoginSearchForm from '$lib/components/logins/login-search-form.svelte';
	import LoginsTable from '$lib/components/logins/logins-table.svelte';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();
</script>

<div class="flex flex-col gap-4">
	<h1>Logins</h1>
	<LoginSearchForm />
	<Button
		variant="outline"
		class="w-46"
		onclick={() => {
			goto('/logins/new');
		}}
	>
		Create login
	</Button>
	<LoginDialog data={{ folders: data.folders, individualLogin: data.individualLogin }} />
	<LoginsTable data={data.logins} />
</div>
