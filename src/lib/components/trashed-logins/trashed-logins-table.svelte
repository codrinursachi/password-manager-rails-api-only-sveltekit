<script lang="ts">
	import * as Table from '$lib/components/ui/table/index.js';
	import TrashedLoginDropdown from './trashed-login-dropdown.svelte';
	import { goto } from '$app/navigation';

	type TrashedLogin = {
		login_id: number;
		name: string;
		urls: string[];
		trash_date: string;
	};

	const { data } = $props();

	// const trashedLoginsQuery = createQuery<{ trashedLogins: TrashedLogin[] }>({
	// 	queryKey: ['trashedLogins'],
	// 	queryFn: ({ signal }) => queryTrashedLogins(signal)
	// });
	// $effect(() => {
	// 	if ($trashedLoginsQuery.error) {
	// 		toast.error(
	// 			$trashedLoginsQuery.error instanceof Error
	// 				? $trashedLoginsQuery.error.message
	// 				: 'Failed to load trashed logins.',
	// 			{
	// 				description: 'Failed to load trashed logins.',
	// 				action: {
	// 					label: 'Retry',
	// 					onClick: () =>
	// 						queryClient.invalidateQueries({
	// 							queryKey: ['trashedLogins']
	// 						})
	// 				}
	// 			}
	// 		);
	// 	}
	// });
</script>

<Table.Root class="table-fixed">
	<Table.Header>
		<Table.Row>
			<Table.Head>Name</Table.Head>
			<Table.Head>URL</Table.Head>
			<Table.Head>Trash date</Table.Head>
			<Table.Head class="w-16">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
			{#each data as login (login.login_id)}
				<Table.Row>
					<Table.Cell>
						<button
							onclick={() => {
								goto('/trash/' + login.login_id);
							}}
							class="w-full text-left">{login.name}</button
						>
					</Table.Cell>
					<Table.Cell>
						<a
							href={(login.urls[0].includes('http') && login.urls[0]) || '//' + login.urls[0]}
							target="_blank"
							rel="noopener noreferrer"
						>
							<div class="w-full">{login.urls[0]}</div>
						</a>
					</Table.Cell>
					<Table.Cell>{login.trash_date}</Table.Cell>
					<Table.Cell>
						<TrashedLoginDropdown {login} />
					</Table.Cell>
				</Table.Row>
			{/each}
	</Table.Body>
</Table.Root>
