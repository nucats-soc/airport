import { env } from '$env/dynamic/private';
import { renderMaterialSymbol } from '$lib/server/material-symbols';
import { queryDataSource, retrievePage } from './content';
import { getPlace } from './places';
import {
	endDateOf,
	relationIdOf,
	selectColorOf,
	selectNameOf,
	startDateOf,
	statusOf,
	textOf,
	urlOf
} from './properties';

import { type Event, type EventColor } from '../../types/event';
import type { PageObjectResponse } from '@notionhq/client';
import type {
	PropertyFilter,
	TimestampFilter
} from '@notionhq/client/build/src/api-endpoints/common';
import { cache, EVENT_CACHE_TTL } from '$lib/server/cache';
import { HOURS } from '$lib/util/timeUnits';
import { ACADEMIC_YEAR_START_MONTH, getAcademicYear } from '$lib/util/academicYear';

type EventFilter = PropertyFilter | TimestampFilter;
const LISTED_EVENT_STATUSES = ['Scheduled', 'Completed', 'Cancelled'];
const UPCOMING_EVENT_PREVIEW_SIZE = 3;
const HISTORICAL_EVENT_CACHE_TTL = 2 * HOURS;
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
	const eventTypeProperty = page.properties['Event Type'];
	const date = startDateOf(dateProperty);
	const endDate = endDateOf(dateProperty);
	const placeId = relationIdOf(page.properties['Venue (Optional)']);

	if (!date) {
		throw new Error(`Event ${page.id} does not have a start date`);
	}

	return {
		id: page.id,
		createdAt: new Date(page.created_time),
		lastEditedAt: new Date(page.last_edited_time),
		iconSvg: renderMaterialSymbol(textOf(page.properties['Material Symbol'])),
		color: parseEventColor(selectColorOf(eventTypeProperty) ?? 'default'),
		name: textOf(page.properties['Name']) || 'Unnamed',
		type: selectNameOf(eventTypeProperty) ?? 'Event',
		date,
		durationMinutes: durationMinutesBetween(date, endDate),
		description: textOf(page.properties['Description']) || undefined,
		location: placeId ? ((await getPlace(placeId)) ?? undefined) : undefined,
		room: textOf(page.properties['Room (Optional)']) || undefined,
		url: urlOf(page.properties['URL (Optional)']) ?? undefined
	};
}

function durationMinutesBetween(start: Date, end: Date | null): number | undefined {
	if (!end) {
		return undefined;
	}

	const durationMinutes = Math.round((end.getTime() - start.getTime()) / 60_000);
	return durationMinutes > 0 ? durationMinutes : undefined;
}

function parseEventColor(color: string): EventColor {
	if (EVENT_COLORS.includes(color as EventColor)) {
		return color as EventColor;
	}
	return 'gray';
}

async function getEvents(filters: EventFilter[], pageSize?: number): Promise<Event[]> {
	return queryDataSource(
		{
			data_source_id: env.NOTION_EVENT_DATASOURCE ?? '',
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
		async (page) => {
			const event = await parseEvent(page);
			await cache.set(`events:${event.id}`, event, EVENT_CACHE_TTL);
			return event;
		},
		pageSize === undefined
	);
}

export async function getEventById(id: string): Promise<Event | null> {
	return cache.wrap(
		`events:${id}`,
		async () => {
			const page = await retrievePage(id, (result) => result);

			if (!page) {
				return null;
			}

			const status = statusOf(page.properties['Status']) ?? 'Planned';

			if (!LISTED_EVENT_STATUSES.includes(status)) {
				return null;
			}

			return parseEvent(page);
		},
		EVENT_CACHE_TTL
	);
}

function getUpcomingEventsWithLimit(now: Date, pageSize?: number): Promise<Event[]> {
	const date = now.toISOString().slice(0, 10);
	const resultSize = pageSize ?? 'all';

	return cache.wrap(
		`events:upcoming:${date}:${resultSize}`,
		() => {
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
				pageSize
			);
		},
		EVENT_CACHE_TTL
	);
}

export function getUpcomingEvents(now: Date = new Date()): Promise<Event[]> {
	return getUpcomingEventsWithLimit(now, UPCOMING_EVENT_PREVIEW_SIZE);
}

export function getEventsByAcademicYear(academicYear: number): Promise<Event[]> {
	const startMonth = String(ACADEMIC_YEAR_START_MONTH + 1).padStart(2, '0');
	const cacheTime =
		academicYear === getAcademicYear() ? EVENT_CACHE_TTL : HISTORICAL_EVENT_CACHE_TTL;
	return cache.wrap(
		`events:academic-year:${academicYear}`,
		() => {
			return getEvents([
				{
					property: 'Date',
					type: 'date',
					date: {
						on_or_after: `${academicYear}-${startMonth}-01`
					}
				},
				{
					property: 'Date',
					type: 'date',
					date: {
						before: `${academicYear + 1}-${startMonth}-01`
					}
				}
			]);
		},
		cacheTime
	);
}

export function getEventsByYearRange(startYear: number, endYear: number): Promise<Event[]> {
	return cache.wrap(
		`events:years:${startYear}:${endYear}`,
		() => {
			return getEvents([
				{
					property: 'Date',
					type: 'date',
					date: {
						on_or_after: `${startYear}-01-01`
					}
				},
				{
					property: 'Date',
					type: 'date',
					date: {
						before: `${endYear + 1}-01-01`
					}
				}
			]);
		},
		EVENT_CACHE_TTL
	);
}
