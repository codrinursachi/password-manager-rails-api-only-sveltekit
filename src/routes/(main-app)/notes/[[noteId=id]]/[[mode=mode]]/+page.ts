import { queryNote } from '$lib/util/query-utils/query-note';
import { queryNotes } from '$lib/util/query-utils/query-notes';
import type { PageLoad } from './$types';

export const load = (async ({ params, fetch }) => {
	const [notes, individualNote] = await Promise.all([
		queryNotes(null, fetch),
		params.noteId ? queryNote(params.noteId, null, fetch) : undefined
	]);
	return {
		notes: notes.notes,
		individualNote: individualNote?.individualNote
	};
}) satisfies PageLoad;
