import type { RequestHandler } from './$types';
import { getCalendarFeed } from '$lib/server/ical';
import { rateLimit } from '$lib/server/rateLimit';

export const GET: RequestHandler = async () => {
	await rateLimit('events-ical-feed', 5_000);
	const calendarFeed = await getCalendarFeed();

	return new Response(calendarFeed, {
		headers: {
			'Content-Type': 'text/calendar; charset=utf-8'
		}
	});
};
