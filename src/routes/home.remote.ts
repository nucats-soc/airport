import { query } from '$app/server';
import { getUpcomingEvents } from '$lib/server/notion/events';

export const getUpcomingEventsPreview = query(getUpcomingEvents);
