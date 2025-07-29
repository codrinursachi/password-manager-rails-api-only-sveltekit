<script>
	import RouteGuard from '$lib/route-guard.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '../AppSidebar.svelte';
	import { Toaster } from 'svelte-sonner';
	
	const { children, data } = $props();
</script>

<RouteGuard>
	<Sidebar.Provider>
		<AppSidebar {data} />
		<main class="p-4">
			{@render children()}
		</main>
		<Toaster closeButton />
	</Sidebar.Provider>
</RouteGuard>
