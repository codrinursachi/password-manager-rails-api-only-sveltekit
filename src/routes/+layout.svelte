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
		document.querySelector('#overlay')?.classList.add('opacity-50');
		document.querySelector('#loading')?.classList.toggle('hidden');
	});

	afterNavigate(() => {
		BProgress.done();
		document.querySelector('#loading')?.classList.toggle('hidden');
		document.querySelector('#overlay')?.classList.remove('opacity-50');
	});

	let { children } = $props();
</script>

<svelte:head>
	<title>Password Manager</title>
</svelte:head>

<div
	id="loading"
	class="size-25 outline-8-black absolute left-1/2 top-1/2 z-50 hidden -translate-x-1/2 -translate-y-1/2 animate-spin rounded-full border-8 border-gray-200 border-t-black"
></div>
<div id="overlay">
	<QueryClientProvider client={queryClient}>
		{@render children()}
	</QueryClientProvider>
</div>
