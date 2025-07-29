<script lang="ts">
	import { generateKeyPair } from 'web-ssh-keygen';
	import { Label } from '../ui/label';
	import { Input } from '../ui/input';
	import { Button } from '../ui/button';
	import { Textarea } from '../ui/textarea';
	import { page } from '$app/state';
	import { decryptAES } from '$lib/util/crypt-utils/cryptography';

	const { data } = $props();
	const params = page.url.pathname.split('/').slice(1);
	const id = params.find((param) => !isNaN(+param));
	let privateKey = $state('');
	let publicKey = $state('');
	let name = $state('');
	let notes = $state('');
	let privateKeyMasked = $state(true);
	let individualSSHKey = $state({
		name: '',
		private_key: '',
		public_key: '',
		notes: '',
		iv: ''
	});
	$effect.pre(() => {
		const decryptPass = async () => {
			const decryptedPrivateKey = await decryptAES(
				data.private_key,
				data.iv
			);
			privateKey = decryptedPrivateKey;
			publicKey = data.public_key;
			name = data.name;
			notes = data.notes;
		};
		if (data) decryptPass();
	});
	$effect.pre(() => {
		async function generateSSHKey() {
			const { privateKey: generatedPrivateKey, publicKey: generatedPublicKey } =
				await generateKeyPair({
					alg: 'RSASSA-PKCS1-v1_5',
					size: 2048,
					hash: 'SHA-256',
					name: 'ssh-key'
				});

			privateKey = generatedPrivateKey;
			publicKey = generatedPublicKey;
		}

		if (!id) generateSSHKey();
	});
</script>

<div class="grid gap-4 py-4">
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="name" class="text-right">Name</Label>
		<Input id="name" class="col-span-3" name="sshkey[name]" bind:value={name} />
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="private-key" class="mb-auto flex flex-col items-start text-left">
			Private key
			<div>
				<Button
					variant={'ghost'}
					type="button"
					onclick={() => (privateKeyMasked = !privateKeyMasked)}
					class="h-5 w-5"
				>
					<i class="fas fa-eye"></i>
				</Button>
				<Button
					variant={'ghost'}
					type="button"
					onclick={() => navigator.clipboard.writeText(privateKey)}
					class="h-5 w-5"
				>
					<i class="fas fa-clipboard"></i>
				</Button>
			</div>
		</Label>
		<Textarea
			id="private-key"
			class="h-30 col-span-3"
			readonly={true}
			value={'•'.repeat(privateKey.length)}
			hidden={!privateKeyMasked}
		/>
		<Textarea
			id="private-key"
			class="h-30 col-span-3"
			name="sshkey[private_key]"
			readonly={true}
			value={privateKey}
			hidden={privateKeyMasked}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="public-key" class="mb-auto flex flex-col items-start text-right">
			Public key
			<Button
				variant={'ghost'}
				type="button"
				onclick={() => navigator.clipboard.writeText(publicKey)}
				class="h-5 w-5"
			>
				<i class="fas fa-clipboard"></i>
			</Button>
		</Label>
		<Textarea
			id="public-key"
			class="h-30 col-span-3"
			name="sshkey[public_key]"
			readonly={true}
			value={publicKey}
		/>
	</div>
	<div class="grid grid-cols-4 items-center gap-4">
		<Label for="notes" class="mb-auto text-right">Notes</Label>
		<Textarea id="notes" class="col-span-3" name="sshkey[notes]" bind:value={notes} />
	</div>
</div>
