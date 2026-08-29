import { query } from '$app/server';
import { committeePortraitPath } from '$lib/server/committeePortrait';
import { getCommitteeMembers as getCommitteeMembersFromNotion } from '$lib/server/notion/committee';

export const getCommitteeMembers = query(async () =>
	(await getCommitteeMembersFromNotion()).map((member) => ({
		...member,
		imageUrl: committeePortraitPath(member)
	}))
);
