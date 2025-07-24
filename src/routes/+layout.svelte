<script lang="ts">
	import { page } from '$app/state';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import '../app.css';
	import RouteGuard from '$lib/route-guard.svelte';
	import { queryClient } from '$lib/util/query-utils/query-client';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from './AppSidebar.svelte';
	import { Toaster } from 'svelte-sonner';

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	{#if page.url.pathname === '/login' || page.url.pathname === '/register'}
		{@render children()}
	{:else}
		<RouteGuard>
			<Sidebar.Provider>
				<AppSidebar />
				<main class="p-4">
					{@render children()}
				</main>
				<Toaster closeButton />
			</Sidebar.Provider>
		</RouteGuard>
	{/if}
</QueryClientProvider>
