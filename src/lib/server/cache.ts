import { createCache } from 'cache-manager';
import { DAYS, MINUTES } from '$lib/util/timeUnits';

export const cache = createCache();
export const EVENT_CACHE_TTL = 10 * MINUTES;
export const EVENT_ICON_CACHE_TTL = DAYS;
