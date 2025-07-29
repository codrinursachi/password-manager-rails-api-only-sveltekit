<script lang="ts">
	import { Input } from '../ui/input';
	import { Label } from '../ui/label';
	import { decryptAES } from '$lib/util/crypt-utils/cryptography';
	import { Textarea } from '../ui/textarea';
	import { Checkbox } from '../ui/checkbox';
	import * as Select from '$lib/components/ui/select/index.js';
	import PasswordGeneratorDialog from './password-generator-dialog.svelte';
	import { page } from '$app/state';

	type Folder = {
		id: number;
		name: string;
	};

	let { isEditable, setValid, data } = $props();
	let individualLogin = $state({
		name: '',
		login_name: '',
		urls: [{ id: '', uri: '' }],
		login_password: '',
		iv: '',
		notes: '',
		custom_fields: [{ id: '', name: '', value: '' }],
		is_favorite: false,
		folder_id: 0
	});
	const params = page.url.pathname.split('/').slice(1);
	const id = params.find((param) => !isNaN(+param));
	let name = $state(data.individualLogin?.name || '');
	let username = $state(data.individualLogin?.login_name || '');
	let url = $state(data.individualLogin?.urls[0]?.uri || '');
	let password = $state('');
	let urlId = $state(data.individualLogin?.urls[0]?.id || '');
	let notes = $state(data.individualLogin?.notes || '');
	let customFieldName = $state(data.individualLogin?.custom_fields[0]?.name || '');
	let customFieldValue = $state(data.individualLogin?.custom_fields[0]?.value || '');
	let customFieldId = $state(individualLogin?.custom_fields[0]?.id || '');
	let checkboxValue = $state(data.individualLogin?.is_favorite || false);
	setValid(!!data.individualLogin);
	function changePassword(newPassword: string) {
		password = newPassword;
	}

	function handleChange() {
		if (password && name && username && url) {
			setValid(true);
		} else {
			setValid(false);
		}
	}
	let defaultFolderValue = $state(
		data.individualLogin?.folder_id.toString() ||
			data.folders.find((folder: Folder) => folder.name === 'No folder')?.id?.toString()
	);
	let defaultFolderName = $derived.by(() => {
		const folder = data.folders.find((folder: Folder) => folder.id === +defaultFolderValue);
		return folder ? folder.name : '';
	});
	$effect.pre(() => {
		const decryptPass = async () => {
			const decryptedPassword = await decryptAES(
				data.individualLogin?.login_password,
				data.individualLogin?.iv
			);
			password = decryptedPassword;
		};

		if (data.individualLogin) decryptPass();
	});
</script>

<div class="grid gap-4 py-4" onchange={handleChange}>
	<div class="grid grid-cols-4 items-center gap-4">
		<Input type="hidden" name="login[login_id]" value={id ?? ''} />
		<Label for="name" class="text-right">Name</Label>
		<Input
			id="name"
			class="col-span-3"
			name="login[name]"
			defaultValue={individualLogin?.name}
			readonly={!isEditable}
			required
			bind:value={name}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="username" class="text-right">Username</Label>
		<Input
			id="username"
			class="col-span-3"
			name="login[login_name]"
			defaultValue={individualLogin?.login_name}
			readonly={!isEditable}
			required
			bind:value={username}
			autocomplete="off"
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="password" class="text-right">Password</Label>
		<Input
			id="password"
			type="password"
			class="col-span-3"
			name="login[login_password]"
			readonly={!isEditable}
			required
			bind:value={password}
			onchange={(e) => {
				password = (e.target as HTMLInputElement).value;
			}}
			autocomplete="off"
		/>
	</div>
	<PasswordGeneratorDialog setLoginPassword={changePassword} />
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="Url" class="text-right">Url</Label>
		<Input type="hidden" name="login[urls_attributes][0][id]" bind:value={urlId} />
		<Input
			id="Url"
			class="col-span-3"
			name="login[urls_attributes][0][uri]"
			defaultValue={individualLogin?.urls[0]?.uri}
			readonly={!isEditable}
			required
			bind:value={url}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="notes" class="text-right">Notes</Label>
		<Textarea
			id="notes"
			class="col-span-3"
			name="login[notes]"
			bind:value={notes}
			readonly={!isEditable}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="custom-field-name" class="text-left">Custom field name</Label>
		<Input
			id="custom-field-name"
			class="col-span-3"
			name="login[custom_fields_attributes][0][name]"
			bind:value={customFieldName}
			readonly={!isEditable}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="custom-field-value" class="text-left">Custom field value</Label>
		<Input type="hidden" name="login[custom_fields_attributes][0][id]" bind:value={customFieldId} />
		<Input
			id="custom-field-value"
			class="col-span-3"
			name="login[custom_fields_attributes][0][value]"
			bind:value={customFieldValue}
			readonly={!isEditable}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="fav-check" class="text-right">Favorite</Label>
		<Checkbox
			id="fav-check"
			class="col-span-3"
			name="login[is_favorite]"
			bind:checked={checkboxValue}
			disabled={!isEditable}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label class="text-right">Folder</Label>
		<Select.Root
			name="login[folder_id]"
			bind:value={defaultFolderValue}
			disabled={!isEditable}
			type="single"
		>
			<Select.Trigger class="w-[295px]">
				{defaultFolderName}
			</Select.Trigger>
			<Select.Content>
				{#each data.folders as folder (folder.id)}
					<Select.Item value={folder.id.toString()}>
						{folder.name}
					</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="file">File</Label>
		<Input id="file" type="file" class="w-[295px]" name="login[file]" disabled={!isEditable} />
	</div>
</div>
