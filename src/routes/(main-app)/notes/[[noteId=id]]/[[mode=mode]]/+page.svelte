<script lang="ts">
	import { goto } from '$app/navigation';
	import NotesDialog from '$lib/components/notes/notes-dialog.svelte';
	import NotesTable from '$lib/components/notes/notes-table.svelte';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();
</script>

<div class="flex flex-col gap-4">
	<h1>Notes</h1>
	<Button
		onclick={() => {
			goto('/notes/new');
		}}
		variant="outline"
		class="w-46">Create note</Button
	>
	<div class="flex flex-wrap gap-4">
		<NotesTable data={data.notes}/>
	</div>
	<NotesDialog data={data.individualNote}/>
</div>
