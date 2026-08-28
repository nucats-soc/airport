import { createCache } from 'cache-manager';
import { MINUTES } from '$lib/util/timeUnits';

export const cache = createCache();
export const EVENT_CACHE_TTL = 10 * MINUTES;
