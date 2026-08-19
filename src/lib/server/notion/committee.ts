import { env } from '$env/dynamic/private';
import { queryDataSource } from './content';
import { emailOf, firstFileUrlOf, numberOf, selectNameOf, textOf, urlOf } from './properties';

import type { CommitteeMember } from '$lib/types/committeeMember';
import type { PageObjectResponse } from '@notionhq/client';

function committeeDataSourceIdOf(): string {
	const committeeDataSourceId = env.NOTION_COMMITTEE_DATASOURCE;

	if (!committeeDataSourceId) {
		throw new Error('NOTION_COMMITTEE_DATASOURCE environment variable is not set');
	}

	return committeeDataSourceId;
}

const COMMITTEE_PAGE_SIZE = 100;

const NAME_PROPERTY_ALIASES = ['Name'];
const POSITION_PROPERTY_ALIASES = ['Position'];
const PHOTO_PROPERTY_ALIASES = ['Photo'];
const EMAIL_PROPERTY_ALIASES = ['Email'];
const WEBSITE_PROPERTY_ALIASES = ['Website'];
const INSTAGRAM_PROPERTY_ALIASES = ['Instagram'];
const LINKEDIN_PROPERTY_ALIASES = ['LinkedIn'];
const YEAR_PROPERTY_ALIASES = ['Year', 'Committee Year'];

type PageProperties = PageObjectResponse['properties'];
type PageProperty = PageProperties[string] | undefined;

function propertyByAliases(properties: PageProperties, aliases: readonly string[]): PageProperty {
	const propertiesByName = new Map<string, PageProperty>();

	for (const [name, property] of Object.entries(properties)) {
		propertiesByName.set(name.toLowerCase(), property);
	}

	for (const alias of aliases) {
		const property = propertiesByName.get(alias.toLowerCase());

		if (property) {
			return property;
		}
	}

	return undefined;
}

function titlePropertyOf(properties: PageProperties): PageProperty {
	for (const property of Object.values(properties)) {
		if (property?.type === 'title') {
			return property;
		}
	}

	return undefined;
}

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

function textLikeValueOf(property: PageProperty): string | null {
	if (!property) {
		return null;
	}

	return textOf(property) ?? selectNameOf(property) ?? urlOf(property);
}

function nameOf(property: PageProperty): string | null {
	if (!property || property.type !== 'title') {
		return null;
	}

	return property.title.map((rich) => rich.plain_text).join(' ');
}

function committeeMemberNameOf(properties: PageProperties): string | null {
	const aliasedNameProperty = propertyByAliases(properties, NAME_PROPERTY_ALIASES);
	const inferredTitleProperty = titlePropertyOf(properties);

	return (
		nameOf(aliasedNameProperty) ??
		textOf(aliasedNameProperty) ??
		nameOf(inferredTitleProperty) ??
		textOf(inferredTitleProperty)
	);
}

function positionOf(property: PageProperty): string | null {
	if (!property) {
		return null;
	}

	return selectNameOf(property) ?? textOf(property);
}

function parseCommitteeYear(property: PageProperty): number | null {
	const yearFromNumber = numberOf(property);

	if (yearFromNumber !== null && Number.isInteger(yearFromNumber)) {
		return yearFromNumber;
	}

	const yearFromText = textLikeValueOf(property);

	if (!yearFromText) {
		return null;
	}

	const yearMatch = yearFromText.match(/\b\d{4}\b/);
	return yearMatch ? Number.parseInt(yearMatch[0], 10) : null;
}

function parseCommitteeMember(page: PageObjectResponse): CommitteeMember {
	const properties = page.properties;
	const positionProperty = propertyByAliases(properties, POSITION_PROPERTY_ALIASES);
	const photoProperty = propertyByAliases(properties, PHOTO_PROPERTY_ALIASES);
	const emailProperty = propertyByAliases(properties, EMAIL_PROPERTY_ALIASES);
	const websiteProperty = propertyByAliases(properties, WEBSITE_PROPERTY_ALIASES);
	const instagramProperty = propertyByAliases(properties, INSTAGRAM_PROPERTY_ALIASES);
	const linkedInProperty = propertyByAliases(properties, LINKEDIN_PROPERTY_ALIASES);
	const yearProperty = propertyByAliases(properties, YEAR_PROPERTY_ALIASES);

	return {
		id: page.id,
		year: parseCommitteeYear(yearProperty) ?? new Date().getFullYear(),
		name: committeeMemberNameOf(properties) || 'Unnamed member',
		position: positionOf(positionProperty) || 'Committee member',
		imageUrl: firstFileUrlOf(photoProperty) ?? iconUrlOf(page) ?? undefined,
		email: emailOf(emailProperty) || undefined,
		website: urlOf(websiteProperty) || undefined,
		instagram: textLikeValueOf(instagramProperty) || undefined,
		linkedIn: textLikeValueOf(linkedInProperty) || undefined
	};
}

export async function getCommitteeMembers(
	year: number = new Date().getFullYear()
): Promise<CommitteeMember[]> {
	const committeeMembers = await queryDataSource(
		{
			data_source_id: committeeDataSourceIdOf(),
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

	return committeeMembers.filter((committeeMember) => committeeMember.year === year);
}
