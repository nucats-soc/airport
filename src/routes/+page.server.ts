import { getUpcomingEvents } from '$lib/server/notion/events';

import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	events: await getUpcomingEvents()
});
