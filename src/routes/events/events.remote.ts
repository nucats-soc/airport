import { query } from '$app/server';
import { getEventsByYear as getEventsByYearFromNotion } from '$lib/server/notion/events';
import * as v from 'valibot';

const yearSchema = v.pipe(v.number(), v.integer(), v.minValue(1970), v.maxValue(2100));

export const getEventsByYear = query(yearSchema, getEventsByYearFromNotion);
