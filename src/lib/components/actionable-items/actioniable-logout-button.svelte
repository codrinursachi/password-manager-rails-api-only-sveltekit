<script lang="ts">
	import { goto } from "$app/navigation";
    import { queryClient } from "$lib/util/query-utils/query-client";
    import { Button } from "../ui/button";
</script>

<Button
    onclick={() => {
        localStorage.clear();
        queryClient.clear();
        goto("/login");
    }}
>
    Logout
</Button>
