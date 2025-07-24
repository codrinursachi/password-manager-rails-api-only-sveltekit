<script lang="ts">
    import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import ActionableLogoutButton from "$lib/components/actionable-items/actioniable-logout-button.svelte";
    import SidebarFoldersGroups from "$lib/components/sidebar/sidebar-folders-groups.svelte";
    import SidebarUserFoldersGroup from "$lib/components/sidebar/sidebar-user-folders-group.svelte";
	import { goto } from "$app/navigation";
</script>

<Sidebar.Root>
    <Sidebar.Header>
        <button onclick={()=>goto("/")}>
            <span class="text-xl">Password Manager </span>
            <i class="fas fa-shield-halved fa-lg"></i>
        </button>
    </Sidebar.Header>
    <Sidebar.Content>
        <SidebarFoldersGroups>
            <SidebarUserFoldersGroup />
        </SidebarFoldersGroups>
    </Sidebar.Content>
    <Sidebar.Footer>
        <ActionableLogoutButton />
    </Sidebar.Footer>
</Sidebar.Root>
