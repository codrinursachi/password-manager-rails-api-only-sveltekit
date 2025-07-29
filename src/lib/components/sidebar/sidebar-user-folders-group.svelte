<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import FoldersDropdown from './folders-dropdown.svelte';
	import SidebarUserFoldersGroupLabel from './sidebar-user-folders-group-label.svelte';
	import { goto } from '$app/navigation';

	const params = new URLSearchParams(new URL(window.location.href).search);
	const currentFolder = params.get('folder_id');
	const { data } = $props();
</script>

<Sidebar.Group>
	<SidebarUserFoldersGroupLabel />
	<Sidebar.GroupContent>
		<Sidebar.Menu>
				{#each data.folders as folder (folder.id)}
					<Sidebar.MenuItem>
						<Sidebar.MenuButton isActive={currentFolder === folder.id.toString()}>
							{#snippet child({ props })}
								<button onclick={() => goto('/logins?folder_id=' + folder.id)} {...props}>
									<span>{folder.name}</span>
								</button>
							{/snippet}
						</Sidebar.MenuButton>
						{#if folder.name !== 'No folder'}
							<FoldersDropdown {folder} />
						{/if}
					</Sidebar.MenuItem>
				{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
