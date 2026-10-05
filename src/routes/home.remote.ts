import { query } from '$app/server';
import { getUpcomingEvents } from '#lib/server/notion/events.js';

export const getUpcomingEventsPreview = query(getUpcomingEvents);
