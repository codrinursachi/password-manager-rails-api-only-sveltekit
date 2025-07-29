<script lang="ts">
	import { decryptAES } from '$lib/util/crypt-utils/cryptography';
	import { Input } from '../ui/input';
	import { Label } from '../ui/label';
	import { Textarea } from '../ui/textarea';
	import { page } from '$app/state';

	const { data } = $props();
	const params = page.url.pathname.split('/').slice(1);
	const id = params.find((param) => !isNaN(+param));
	let noteName = $state('');
	let noteText = $state('');

	$effect.pre(() => {
		const decryptNote = async () => {
			const [decryptedNoteName, decryptedNoteText] = await Promise.all([
				decryptAES(data?.name, data?.name_iv),
				decryptAES(data?.text, data?.iv)
			]);

			noteName = decryptedNoteName;
			noteText = decryptedNoteText;
		};

		if (data) decryptNote();
	});
</script>

<div class="grid gap-4 py-4">
	<div class="grid grid-cols-4 items-center gap-4">
		<Input type="hidden" name="note[note_id]" value={id} />
		<Label for="name" class="text-right">Name</Label>
		<Input id="name" class="col-span-3" name="note[name]" bind:value={noteName} />
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="text" class="mb-auto flex flex-col items-start text-left">Text</Label>
		<Textarea id="text" class="h-30 col-span-3" name="note[text]" bind:value={noteText} />
	</div>
</div>
