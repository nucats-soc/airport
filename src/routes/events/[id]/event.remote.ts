import { error } from '@sveltejs/kit';
import { query } from '$app/server';
import { renderMarkdown } from '$lib/server/markdown/renderer';
import { retrievePageMarkdown } from '$lib/server/notion/content';
import { getEventById } from '$lib/server/notion/events';
import * as v from 'valibot';

const eventIdSchema = v.pipe(v.string(), v.nonEmpty());

export const getEvent = query(eventIdSchema, async (id) => {
	const event = await getEventById(id);

	if (!event) {
		error(404, 'Event not found');
	}

	const markdown = await retrievePageMarkdown(event.id);
	const contentHtml = await renderMarkdown(markdown, 'notion');

	return { event, contentHtml };
});
