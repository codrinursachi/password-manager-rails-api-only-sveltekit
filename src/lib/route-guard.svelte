<script lang="ts">
	import { goto } from "$app/navigation";
    import { getAuthToken } from "./util/auth";

    let authorized = $state(false);
    let { children } = $props();
    $effect(() => {
        const token = getAuthToken();
        if (!token || token === "EXPIRED") {
            goto("/login");
            authorized = false;
        } else {
            authorized = true;
            const handleBeforeUnload = () => {
                localStorage.clear();
            };
            addEventListener("beforeunload", handleBeforeUnload);
            setTimeout(
                () => {
                    localStorage.clear();
                    goto("/login");
                },
                new Date(localStorage.getItem("expiration") || "").getTime() -
                    Date.now()
            );
            goto("/logins");
            return () => {
                removeEventListener("beforeunload", handleBeforeUnload);
            };
        }
    });
</script>

{#if authorized}
{@render children()}
{/if}
