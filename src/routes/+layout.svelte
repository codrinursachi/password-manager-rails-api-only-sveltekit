<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	import { queryClient } from '$lib/util/query-utils/query-client';

	let { children } = $props();
</script>

<svelte:head>
	<title>Password Manager</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
