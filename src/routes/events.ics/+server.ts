import type { RequestHandler } from './$types';
import { getCalendarFeed } from '$lib/server/ical';

export const GET: RequestHandler = async () => {
	const calendarFeed = await getCalendarFeed();

	return new Response(calendarFeed, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8'
		}
	});
};
