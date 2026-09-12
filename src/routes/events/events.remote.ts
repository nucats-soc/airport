import { query } from '$app/server';
import { getEventsByAcademicYear as getEventsByAcademicYearFromNotion } from '$lib/server/notion/events';
import { rateLimit } from '$lib/server/rateLimit';
import { EARLIEST_ACADEMIC_YEAR, getAcademicYear } from '$lib/util/academicYear';
import * as v from 'valibot';

const academicYearSchema = v.pipe(
	v.number(),
	v.integer(),
	v.minValue(EARLIEST_ACADEMIC_YEAR),
	v.check((year) => year <= getAcademicYear() + 1, 'Year must be within the current academic year')
);

export const getEventsByAcademicYear = query(academicYearSchema, async (academicYear) => {
	await rateLimit('events-by-academic-year');
	return getEventsByAcademicYearFromNotion(academicYear);
});
