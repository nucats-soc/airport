import type { Event } from '$lib/types/event';
import type { CalendarSelection } from './types';

const INITIAL_MONTH_WINDOW = 3;

export function getEventEndDate<T extends Pick<Event, 'date'> & { durationMinutes?: number }>(
	event: T
): Date {
	if (event.durationMinutes && event.durationMinutes > 0) {
		return new Date(event.date.getTime() + event.durationMinutes * 60_000);
	}
	return event.date;
}

export function isEventOnDate<T extends Pick<Event, 'date'> & { durationMinutes?: number }>(
	event: T,
	date: Date
): boolean {
	const dayStart = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		0,
		0,
		0,
		0
	).getTime();
	const dayEnd = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate(),
		23,
		59,
		59,
		999
	).getTime();
	const start = event.date.getTime();
	const end = getEventEndDate(event).getTime();
	return start <= dayEnd && end >= dayStart;
}

export function initialCalendarSelection<
	T extends Pick<Event, 'date'> & { durationMinutes?: number }
>(events: T[], today: Date = new Date()): CalendarSelection {
	const year = today.getFullYear();
	const currentMonth = today.getMonth();
	const lastMonth = Math.min(currentMonth + INITIAL_MONTH_WINDOW - 1, 11);

	for (let month = currentMonth; month <= lastMonth; month += 1) {
		const monthStart = new Date(year, month, 1, 0, 0, 0, 0).getTime();
		const nextMonthStart = new Date(year, month + 1, 1, 0, 0, 0, 0).getTime();
		if (
			events.some((event) => {
				const start = event.date.getTime();
				const end = getEventEndDate(event).getTime();
				return start < nextMonthStart && end >= monthStart;
			})
		) {
			return { year, month };
		}
	}

	return { year, month: currentMonth };
}

export function eventsForSelection<T extends Pick<Event, 'date'> & { durationMinutes?: number }>(
	events: T[],
	selection: CalendarSelection
): T[] {
	return events.filter((event) => {
		const start = event.date;
		const end = getEventEndDate(event);

		if (selection.day !== undefined) {
			const dayStart = new Date(selection.year, selection.month, selection.day, 0, 0, 0, 0);
			const dayEnd = new Date(selection.year, selection.month, selection.day, 23, 59, 59, 999);
			return start.getTime() <= dayEnd.getTime() && end.getTime() >= dayStart.getTime();
		}

		const monthStart = new Date(selection.year, selection.month, 1, 0, 0, 0, 0);
		const nextMonthStart = new Date(selection.year, selection.month + 1, 1, 0, 0, 0, 0);
		return start.getTime() < nextMonthStart.getTime() && end.getTime() >= monthStart.getTime();
	});
}

export function nextCalendarSelection(selection: CalendarSelection): CalendarSelection {
	if (selection.day !== undefined) {
		return { year: selection.year, month: selection.month };
	}

	const nextMonth = new Date(selection.year, selection.month + 1, 1);
	return { year: nextMonth.getFullYear(), month: nextMonth.getMonth() };
}

export function isCurrentMonthSelection(
	selection: CalendarSelection,
	today: Date = new Date()
): boolean {
	return (
		selection.day === undefined &&
		selection.year === today.getFullYear() &&
		selection.month === today.getMonth()
	);
}

export function isEventBeforeDate<T extends Pick<Event, 'date'> & { durationMinutes?: number }>(
	event: T,
	today: Date = new Date()
): boolean {
	const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
	const eventEnd = getEventEndDate(event);
	const eventEndDay = new Date(
		eventEnd.getFullYear(),
		eventEnd.getMonth(),
		eventEnd.getDate()
	).getTime();
	return eventEndDay < todayStart;
}

export function partitionEventsByDate<T extends Pick<Event, 'date'> & { durationMinutes?: number }>(
	events: T[],
	selection: CalendarSelection,
	today: Date = new Date()
): { previousEvents: T[]; upcomingEvents: T[] } {
	if (!isCurrentMonthSelection(selection, today)) {
		return { previousEvents: [], upcomingEvents: events };
	}

	const previousEvents: T[] = [];
	const upcomingEvents: T[] = [];

	for (const event of events) {
		if (isEventBeforeDate(event, today)) {
			previousEvents.push(event);
		} else {
			upcomingEvents.push(event);
		}
	}

	return { previousEvents, upcomingEvents };
}
