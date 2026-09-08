import { env } from '$env/dynamic/private';
import { queryDataSource } from './content';
import { numberOf, textOf } from './properties';

import type { Place } from '../../types/place';
import type { PageObjectResponse } from '@notionhq/client';
import { cache } from '$lib/server/cache';
import { MINUTES } from '$lib/util/timeUnits';

const PLACE_PAGE_SIZE = 100;
const PLACE_TTL = 5 * MINUTES;

function parsePlace(page: PageObjectResponse): Place {
	return {
		id: page.id,
		name: textOf(page.properties['Name']) || 'Unnamed room',
		address: textOf(page.properties['Address']) || undefined,
		latitude: numberOf(page.properties['Latitude']) ?? undefined,
		longitude: numberOf(page.properties['Longitude']) ?? undefined
	};
}

export function getPlaces(): Promise<Place[]> {
	return cache.wrap(
		`places`,
		() => {
			return queryDataSource(
				{
					data_source_id: env.NOTION_PLACE_DATASOURCE ?? '',
					sorts: [
						{
							property: 'Name',
							direction: 'ascending'
						}
					],
					page_size: PLACE_PAGE_SIZE
				},
				parsePlace,
				true
			);
		},
		PLACE_TTL
	);
}

export async function getPlace(id: string): Promise<Place | null> {
	const places = await getPlaces();

	return places.find((place) => place.id === id) ?? null;
}
