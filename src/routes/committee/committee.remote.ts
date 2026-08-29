import { query } from '$app/server';
import { getCommitteeMembers as getCommitteeMembersFromNotion } from '$lib/server/notion/committee';

export const getCommitteeMembers = query(getCommitteeMembersFromNotion);
