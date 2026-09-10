import { error } from '@sveltejs/kit';
import { getEventById } from '$lib/server/notion/events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const eventMetadata = await getEventById(params.id);

	if (!eventMetadata) {
		error(404, 'Event not found');
	}

	return { eventMetadata };
};
