import { env } from '$env/dynamic/private';
import { cache } from '$lib/server/cache';
import { MINUTES } from '$lib/util/timeUnits';
import { queryDataSource } from './content';
import { emailOf, firstFileUrlOf, numberOf, selectNameOf, textOf, urlOf } from './properties';

import type { CommitteeMember } from '$lib/types/committeeMember';
import type { PageObjectResponse } from '@notionhq/client';

const COMMITTEE_PAGE_SIZE = 100;
const COMMITTEE_CACHE_TTL = 45 * MINUTES;

function iconUrlOf(page: PageObjectResponse): string | null {
	if (!page.icon) {
		return null;
	}

	if (page.icon.type === 'file') {
		return page.icon.file.url;
	}

	if (page.icon.type === 'external') {
		return page.icon.external.url;
	}

	return null;
}

function parseCommitteeMember(page: PageObjectResponse): CommitteeMember {
	return {
		id: page.id,
		year: numberOf(page.properties['Year']) ?? new Date().getFullYear(),
		name: textOf(page.properties['Name']) || 'Unnamed member',
		position: selectNameOf(page.properties['Position']) || 'Committee member',
		imageUrl: firstFileUrlOf(page.properties['Photo']) ?? iconUrlOf(page) ?? undefined,
		email: emailOf(page.properties['Email']) || undefined,
		website: urlOf(page.properties['Website']) || undefined,
		instagram: urlOf(page.properties['Instagram']) || undefined,
		linkedIn: urlOf(page.properties['LinkedIn']) || undefined,
		github: urlOf(page.properties['GitHub']) || undefined
	};
}

export async function getCommitteeMembers(
	year: number = new Date().getFullYear()
): Promise<CommitteeMember[]> {
	const committeeMembers = await cache.wrap(
		'committee:members',
		() =>
			queryDataSource(
				{
					data_source_id: env.NOTION_COMMITTEE_DATASOURCE ?? '',
					sorts: [
						{
							timestamp: 'created_time',
							direction: 'ascending'
						}
					],
					page_size: COMMITTEE_PAGE_SIZE
				},
				parseCommitteeMember,
				true
			),
		COMMITTEE_CACHE_TTL
	);

	return committeeMembers.filter((committeeMember) => committeeMember.year === year);
}
