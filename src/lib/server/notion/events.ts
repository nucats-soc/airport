import { env } from '$env/dynamic/private';
import { renderMaterialSymbol } from '$lib/server/material-symbols';
import { queryDataSource, retrievePage } from './content';
import { getPlace } from './places';
import { relationIdOf, selectColorOf, startDateOf, statusOf, textOf } from './properties';

import { type Event, type EventColor } from '../../types/event';
import type { PageObjectResponse } from '@notionhq/client';
import type {
	PropertyFilter,
	TimestampFilter
} from '@notionhq/client/build/src/api-endpoints/common';

if (!env.NOTION_EVENT_DATASOURCE) {
	throw new Error('NOTION_EVENT_DATASOURCE environment variable is not set');
}

type EventFilter = PropertyFilter | TimestampFilter;
const LISTED_EVENT_STATUSES = ['Scheduled', 'Completed', 'Cancelled'];
const UPCOMING_EVENT_PAGE_SIZE = 3;
const EVENT_COLORS: readonly EventColor[] = [
	'gray',
	'brown',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple',
	'pink',
	'red'
];

async function parseEvent(page: PageObjectResponse): Promise<Event> {
	const dateProperty = page.properties['Date'];
	const date = startDateOf(dateProperty);
	const placeId = relationIdOf(page.properties['Venue']);

	if (!date) {
		throw new Error(`Event ${page.id} does not have a start date`);
	}

	return {
		id: page.id,
		iconSvg: renderMaterialSymbol(textOf(page.properties['Material Symbol'])),
		color: parseEventColor(selectColorOf(page.properties['Event Type']) ?? 'default'),
		name: textOf(page.properties['Name']) || 'Unnamed',
		date,
		hasTime:
			dateProperty?.type === 'date' && dateProperty.date !== null
				? dateProperty.date.start.includes('T')
				: false,
		description: textOf(page.properties['Description']) || undefined,
		location: placeId ? ((await getPlace(placeId)) ?? undefined) : undefined,
		room: textOf(page.properties['Room (Optional)']) || undefined
	};
}

export function parseEventColor(color: string): EventColor {
	if (EVENT_COLORS.includes(color as EventColor)) {
		return color as EventColor;
	}
	return 'gray';
}

async function getEvents(filters: EventFilter[], pageSize?: number): Promise<Event[]> {
	return queryDataSource(
		{
			data_source_id: env.NOTION_EVENT_DATASOURCE,
			filter: {
				and: [
					{
						property: 'Status',
						type: 'status',
						status: {
							equals: LISTED_EVENT_STATUSES
						}
					},
					...filters
				]
			},
			sorts: [
				{
					property: 'Date',
					direction: 'ascending'
				}
			],
			page_size: pageSize
		},
		parseEvent
	);
}

export async function getEventById(id: string): Promise<Event | null> {
	const page = await retrievePage(id, (result) => result);

	if (!page) {
		return null;
	}

	const status = statusOf(page.properties['Status']) ?? 'Planned';

	if (!LISTED_EVENT_STATUSES.includes(status)) {
		return null;
	}

	return parseEvent(page);
}

export function getUpcomingEvents(now: Date = new Date()): Promise<Event[]> {
	return getEvents(
		[
			{
				property: 'Date',
				type: 'date',
				date: {
					on_or_after: now.toISOString()
				}
			}
		],
		UPCOMING_EVENT_PAGE_SIZE
	);
}

export function getEventsByYear(year: number): Promise<Event[]> {
	return getEvents([
		{
			property: 'Date',
			type: 'date',
			date: {
				on_or_after: `${year}-01-01`
			}
		},
		{
			property: 'Date',
			type: 'date',
			date: {
				before: `${year + 1}-01-01`
			}
		}
	]);
}
