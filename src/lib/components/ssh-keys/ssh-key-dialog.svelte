<script lang="ts">
	import { mutateSSHKey } from '$lib/util/mutate-utils/mutate-ssh-key';
	import { queryClient } from '$lib/util/query-utils/query-client';
	import { toast } from 'svelte-sonner';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '../ui/button';
	import SSHKeyFormInputs from './ssh-key-form-inputs.svelte';
	import { createMutation } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import { untrack } from 'svelte';
	import { invalidateAll } from '$app/navigation';

	const { data } = $props();
	const keyId = $derived(page.params.keyId);
	const isNew = $derived(page.params.mode === 'new');
	let dialogOpen = $state(false);
	let sshKeyMutation = $state(
		createMutation({
			// svelte-ignore state_referenced_locally
			mutationKey: ['sshKeys', keyId ? 'add' : 'edit'],
			mutationFn: async ({
				formData,
				keyId
			}: {
				formData: FormData;
				keyId: string | undefined;
			}) => {
				const method = keyId ? 'PATCH' : 'POST';
				await mutateSSHKey(formData, keyId, method);
			},
			onError: (error: Error, variables) => {
				console.error(error);
				toast.error(error.message, {
					description: 'Error saving SSH key',
					action: {
						label: 'Try again',
						onClick: () => $sshKeyMutation.mutate(variables)
					}
				});
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: ['sshKeys'] });
                invalidateAll();
			}
		})
	);
	$effect(() => {
		dialogOpen = !!keyId || isNew;
		untrack(() => {
			if (dialogOpen) {
				sshKeyMutation = createMutation({
					mutationKey: ['sshKeys', keyId ? 'edit' : 'add'],
					mutationFn: async ({
						formData,
						keyId
					}: {
						formData: FormData;
						keyId: string | undefined;
					}) => {
						const method = keyId ? 'PATCH' : 'POST';
						await mutateSSHKey(formData, keyId, method);
					},
					onError: (error: Error, variables) => {
						toast.error(error.message, {
							description: 'Error saving SSH key',
							action: {
								label: 'Try again',
								onClick: () => $sshKeyMutation.mutate(variables)
							}
						});
					},
					onSettled: () => {
						queryClient.invalidateQueries({ queryKey: ['sshKeys'] });
						invalidateAll();
					}
				});
			}
		});
	});
</script>

<Dialog.Root
	open={dialogOpen}
	onOpenChange={(isOpen: boolean) => {
		dialogOpen = isOpen;
		if (!isOpen) {
			setTimeout(() => window.history.back(), 200);
		}
	}}
>
	<Dialog.Content class="sm:max-w-lg">
		<Dialog.Header>
			<Dialog.Title>
				{keyId ? 'Edit' : 'Create'} ssh key
			</Dialog.Title>
		</Dialog.Header>
		<Dialog.Description class="hidden">
			{keyId ? 'Edit' : 'Create'} ssh key
		</Dialog.Description>
		<form
			onsubmit={(e) => {
				e.preventDefault();
				$sshKeyMutation.mutate({
					formData: new FormData(e.target as HTMLFormElement),
					keyId: keyId
				});
			}}
			encType="multipart/form-data"
		>
			<SSHKeyFormInputs {data} />
			<Dialog.Footer class="sm:justify-start">
				<Dialog.Close>
					{#snippet child({ props })}
						<Button type="button" variant="secondary" {...props}>Close</Button>
					{/snippet}
				</Dialog.Close>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button type="submit" {...props}>Save</Button>
					{/snippet}
				</Dialog.Close>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
