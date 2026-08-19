import { getCommitteeMembers } from '$lib/server/notion/committee';

import type { PageServerLoad } from './$types';

function selectedYearOf(yearParam: string | null): number {
	const fallbackYear = new Date().getFullYear();

	if (!yearParam) {
		return fallbackYear;
	}

	const selectedYear = Number.parseInt(yearParam, 10);

	if (!Number.isInteger(selectedYear) || selectedYear < 1970 || selectedYear > 3000) {
		return fallbackYear;
	}

	return selectedYear;
}

export const load: PageServerLoad = async ({ url }) => {
	const selectedYear = selectedYearOf(url.searchParams.get('year'));

	return {
		selectedYear,
		committeeMembers: await getCommitteeMembers(selectedYear)
	};
};
