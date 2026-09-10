import * as v from 'valibot';
import { query } from '$app/server';
import {
	getCommitteeMembers as getCommitteeMembersFromNotion,
	getCommitteeYears as getCommitteeYearsFromNotion
} from '$lib/server/notion/committee';

export const getCommitteeMembers = query(v.number(), (year) => getCommitteeMembersFromNotion(year));

export const getCommitteeYears = query(getCommitteeYearsFromNotion);
