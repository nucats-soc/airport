import { Temporal } from '@js-temporal/polyfill';

function toZonedDateTime(date: Date, timeZone: string): Temporal.ZonedDateTime {
	return Temporal.Instant.fromEpochMilliseconds(date.getTime()).toZonedDateTimeISO(timeZone);
}

export function formatDate(date: Date): string {
	return toZonedDateTime(date, 'UTC').toLocaleString('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short'
	});
}

export function formatMonth(date: Date): string {
	return toZonedDateTime(date, 'UTC').toLocaleString('en-GB', {
		month: 'long',
		year: 'numeric'
	});
}

export function formatTime(date: Date): string {
	return toZonedDateTime(date, 'Europe/London').toLocaleString('en-GB', {
		hour: '2-digit',
		minute: '2-digit'
	});
}

export function formatDuration(totalMinutes: number): string {
	const { days, hours, minutes } = Temporal.Duration.from({ minutes: totalMinutes }).round({
		largestUnit: 'days'
	});

	return [
		days ? `${days} ${days === 1 ? 'day' : 'days'}` : '',
		hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '',
		minutes ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : ''
	]
		.filter(Boolean)
		.join(' ');
}
