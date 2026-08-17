import { error } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/server/markdown/renderer';
import { retrievePageMarkdown } from '$lib/server/notion/content';
import { getEventById } from '$lib/server/notion/events';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const event = await getEventById(params.id);

	if (!event) {
		error(404, 'Event not found');
	}

	const markdown = await retrievePageMarkdown(event.id);
	const contentHtml = await renderMarkdown(markdown, 'notion');

	return { event, contentHtml };
};
