import { env } from '$env/dynamic/private';
import { cache } from '$lib/server/cache';
import { MINUTES } from '$lib/util/timeUnits';
import { getAcademicYear, yearOfLabel } from '$lib/util/academicYear';
import { queryDataSource, retrieveDataSource } from './content';
import { emailOf, firstFileUrlOf, numberOf, selectNameOf, textOf, urlOf } from './properties';

import type { CommitteeMember } from '$lib/types/committeeMember';
import type { PageObjectResponse } from '@notionhq/client';

const COMMITTEE_PAGE_SIZE = 100;
const COMMITTEE_CACHE_TTL = 60 * MINUTES;

async function fetchCommitteeMembers(): Promise<CommitteeMember[]> {
	return queryDataSource(
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
	);
}

const COMMITTEE_ROLE_ORDER: Record<string, number> = {
	President: 0,
	Secretary: 1,
	Treasurer: 2,
	'Welfare Officer': 3,
	'Social Secretary': 4,
	'Outreach Officer': 5,
	'Tech Officer': 6
};

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

function committeeYearOf(page: PageObjectResponse): number {
	return (
		yearOfLabel(selectNameOf(page.properties['Year'])) ??
		numberOf(page.properties['Year']) ??
		getAcademicYear()
	);
}

function parseCommitteeMember(page: PageObjectResponse): CommitteeMember {
	return {
		id: page.id,
		year: committeeYearOf(page),
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

function sortCommitteeMembers(members: CommitteeMember[]): CommitteeMember[] {
	return members.sort(
		(a, b) =>
			(COMMITTEE_ROLE_ORDER[a.position] ?? Number.MAX_SAFE_INTEGER) -
			(COMMITTEE_ROLE_ORDER[b.position] ?? Number.MAX_SAFE_INTEGER)
	);
}

async function getCommitteeYearsFromLabels(): Promise<number[] | null> {
	const dataSource = await retrieveDataSource(env.NOTION_COMMITTEE_DATASOURCE ?? '');
	const yearProperty = dataSource.properties['Year'];

	if (!yearProperty || yearProperty.type !== 'select') {
		return null;
	}

	return yearProperty.select.options
		.map((option) => yearOfLabel(option.name))
		.filter((year): year is number => year !== null)
		.sort((a, b) => b - a);
}

async function getCommitteeYearsFromMembers(): Promise<number[]> {
	const years = await queryDataSource(
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
		committeeYearOf,
		true
	);

	return [...new Set(years)].sort((a, b) => b - a);
}

export async function getCommitteeYears(): Promise<number[]> {
	return cache.wrap(
		'committee:years',
		async () => {
			return (await getCommitteeYearsFromLabels()) ?? getCommitteeYearsFromMembers();
		},
		COMMITTEE_CACHE_TTL
	);
}

export async function getAllCommitteeMembers(): Promise<CommitteeMember[]> {
	return cache.wrap(
		'committee:members:all',
		async () => sortCommitteeMembers(await fetchCommitteeMembers()),
		COMMITTEE_CACHE_TTL
	);
}
