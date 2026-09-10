import { cache } from '$lib/server/cache';
import { getEventsByYearRange } from '$lib/server/notion/events';
import type { Event } from '$lib/types/event';
import { MINUTES } from '$lib/util/timeUnits';
import { Temporal } from '@js-temporal/polyfill';

const EVENT_FEED_CACHE = 30 * MINUTES;
const EVENT_TIME_ZONE = 'Europe/London';

export function getCalendarFeed(): Promise<string> {
	return cache.wrap('events:calendar', generateCalendarFeed, EVENT_FEED_CACHE);
}

async function generateCalendarFeed(): Promise<string> {
	const currentYear = new Date().getFullYear();

	const events = await getEventsByYearRange(currentYear - 1, currentYear + 1);

	const result = [
		'BEGIN:VCALENDAR',
		'VERSION:2.0',
		'PRODID:-//NUCATS//Events//EN',
		'CALSCALE:GREGORIAN',
		'X-WR-CALNAME:NUCATS',
		`X-WR-TIMEZONE:${EVENT_TIME_ZONE}`
	];

	for (const event of events) {
		result.push(...encodeEvent(event));
	}

	result.push('END:VCALENDAR');

	return result.map(foldICalLine).join('\r\n') + '\r\n';
}

function encodeDate(date: Date): string {
	return [
		date.getUTCFullYear(),
		String(date.getUTCMonth() + 1).padStart(2, '0'),
		String(date.getUTCDate()).padStart(2, '0')
	].join('');
}

function encodeEvent(event: Event): string[] {
	const result: string[] = [
		'BEGIN:VEVENT',
		`UID:${event.id}@nucats.org`,
		`SUMMARY:${sanitize(event.name)}`,
		`URL:https://nucats.org/events/${event.id}`,
		`CREATED:${encodeDateTime(event.createdAt)}`,
		`LAST-MODIFIED:${encodeDateTime(event.lastEditedAt)}`,
		`DTSTAMP:${encodeDateTime(new Date())}`
	];

	if (event.description) {
		result.push(`DESCRIPTION:${sanitize(event.description)}`);
	}

	if (event.location) {
		if (event.room) {
			result.push(`LOCATION:${sanitize(event.location.name)}\\, Room ${sanitize(event.room)}`);
		} else {
			result.push(`LOCATION:${sanitize(event.location.name)}`);
		}

		// Coordinates if we have them
		if (Number.isFinite(event.location.latitude) && Number.isFinite(event.location.longitude)) {
			result.push(`GEO:${event.location.latitude};${event.location.longitude}`);
		}
	} else if (event.room) {
		// Very, very weird edge case for online-based events
		result.push(`LOCATION:${sanitize(event.room)}`);
	}

	if (event.durationMinutes) {
		result.push(
			`DTSTART;TZID=${EVENT_TIME_ZONE}:${encodeDateTimeInTimeZone(event.date, EVENT_TIME_ZONE)}`,
			`DURATION:PT${event.durationMinutes}M`
		);
	} else {
		result.push(`DTSTART;VALUE=DATE:${encodeDate(event.date)}`, 'DURATION:P1D');
	}

	result.push('END:VEVENT');
	return result;
}

function encodeDateTime(date: Date): string {
	return (
		encodeDate(date) +
		'T' +
		[
			String(date.getUTCHours()).padStart(2, '0'),
			String(date.getUTCMinutes()).padStart(2, '0'),
			String(date.getUTCSeconds()).padStart(2, '0')
		].join('') +
		'Z'
	);
}

function encodeDateTimeInTimeZone(date: Date, timeZone: string): string {
	const zonedDate = Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO(
		timeZone
	);

	return [
		zonedDate.year,
		String(zonedDate.month).padStart(2, '0'),
		String(zonedDate.day).padStart(2, '0'),
		'T',
		String(zonedDate.hour).padStart(2, '0'),
		String(zonedDate.minute).padStart(2, '0'),
		String(zonedDate.second).padStart(2, '0')
	].join('');
}

function sanitize(value: string): string {
	return value
		.replace(/\\/g, '\\\\')
		.replace(/\r\n|\r|\n/g, '\\n')
		.replace(/;/g, '\\;')
		.replace(/,/g, '\\,');
}

function foldICalLine(line: string): string {
	const encoder = new TextEncoder();

	const lines: string[] = [];
	let current = '';
	let currentBytes = 0;

	for (const char of line) {
		const charBytes = encoder.encode(char).length;

		if (currentBytes + charBytes > 75) {
			lines.push(current);

			// Continuation lines start with a single space.
			current = ' ' + char;
			currentBytes = 1 + charBytes;
		} else {
			current += char;
			currentBytes += charBytes;
		}
	}

	if (current.length > 0) {
		lines.push(current);
	}

	return lines.join('\r\n');
}
