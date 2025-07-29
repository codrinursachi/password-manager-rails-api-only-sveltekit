<script lang="ts">
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	import { queryClient } from '$lib/util/query-utils/query-client';
	import { BProgress } from '@bprogress/core';
	import '@bprogress/core/css';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	BProgress.configure({ showSpinner: false });
	beforeNavigate(() => {
		BProgress.start();
	});

	afterNavigate(() => {
		BProgress.done();
	});

	let { children } = $props();
</script>

<svelte:head>
	<title>Password Manager</title>
</svelte:head>

<QueryClientProvider client={queryClient}>
	{@render children()}
</QueryClientProvider>
