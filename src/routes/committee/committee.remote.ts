import { query } from '$app/server';
import { rateLimit } from '$lib/server/rateLimit';
import {
	getAllCommitteeMembers as getAllCommitteeMembersFromNotion,
	getCommitteeYears as getCommitteeYearsFromNotion
} from '$lib/server/notion/committee';

export const getAllCommitteeMembers = query(async () => {
	await rateLimit('committee-members');
	return getAllCommitteeMembersFromNotion();
});

export const getCommitteeYears = query(async () => {
	await rateLimit('committee-years');
	return getCommitteeYearsFromNotion();
});
