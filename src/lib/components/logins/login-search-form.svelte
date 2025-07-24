<script lang="ts">
	import { goto } from "$app/navigation";
    import { Button } from "../ui/button";
    import { Input } from "../ui/input";

    const handleSearch = (e: Event) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const query = formData.get("search")?.toString() || "";
        goto("/logins" + `?q=${query}`);
    };
</script>

<form
    class="flex w-full max-w-sm items-center space-x-2"
    onsubmit={handleSearch}
>
    <Input type="text" name="search" />
    <Button type="submit">Search</Button>
</form>
