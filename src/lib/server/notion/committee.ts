import { env } from '$env/dynamic/private';
import { queryDataSource } from './content';
import { emailOf, firstFileUrlOf, selectNameOf, textOf, urlOf } from './properties';

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

function parseCommitteeMember(page: PageObjectResponse): CommitteeMember {
	const properties = page.properties;
	const nameProperty = propertyByAliases(properties, NAME_PROPERTY_ALIASES);
	const positionProperty = propertyByAliases(properties, POSITION_PROPERTY_ALIASES);
	const photoProperty = propertyByAliases(properties, PHOTO_PROPERTY_ALIASES);
	const emailProperty = propertyByAliases(properties, EMAIL_PROPERTY_ALIASES);
	const websiteProperty = propertyByAliases(properties, WEBSITE_PROPERTY_ALIASES);
	const instagramProperty = propertyByAliases(properties, INSTAGRAM_PROPERTY_ALIASES);
	const linkedInProperty = propertyByAliases(properties, LINKEDIN_PROPERTY_ALIASES);

	return {
		id: page.id,
		name: textOf(nameProperty) || 'Unnamed member',
		position: textLikeValueOf(positionProperty) || 'Committee member',
		imageUrl: firstFileUrlOf(photoProperty) ?? iconUrlOf(page) ?? undefined,
		email: emailOf(emailProperty) || undefined,
		website: urlOf(websiteProperty) || undefined,
		instagram: textLikeValueOf(instagramProperty) || undefined,
		linkedIn: textLikeValueOf(linkedInProperty) || undefined
	};
}

export function getCommitteeMembers(): Promise<CommitteeMember[]> {
	return queryDataSource(
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
}
