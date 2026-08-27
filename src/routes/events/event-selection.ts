import type { Event } from '$lib/types/event';
import type { CalendarSelection } from './types';

export function eventsForSelection<T extends Pick<Event, 'date'>>(
	events: T[],
	selection: CalendarSelection
): T[] {
	return events.filter(
		(event) =>
			event.date.getFullYear() === selection.year &&
			event.date.getMonth() === selection.month &&
			(selection.day === undefined || event.date.getDate() === selection.day)
	);
}

export function nextCalendarSelection(selection: CalendarSelection): CalendarSelection {
	if (selection.day !== undefined) {
		return { year: selection.year, month: selection.month };
	}

	const nextMonth = new Date(selection.year, selection.month + 1, 1);
	return { year: nextMonth.getFullYear(), month: nextMonth.getMonth() };
}
