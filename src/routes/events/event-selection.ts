import type { Event } from '$lib/types/event';
import type { CalendarSelection } from './types';

const INITIAL_MONTH_WINDOW = 3;

export function initialCalendarSelection<T extends Pick<Event, 'date'>>(
	events: T[],
	today: Date = new Date()
): CalendarSelection {
	const year = today.getFullYear();
	const currentMonth = today.getMonth();
	const lastMonth = Math.min(currentMonth + INITIAL_MONTH_WINDOW - 1, 11);

	for (let month = currentMonth; month <= lastMonth; month += 1) {
		if (
			events.some((event) => event.date.getFullYear() === year && event.date.getMonth() === month)
		) {
			return { year, month };
		}
	}

	return { year, month: currentMonth };
}

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
