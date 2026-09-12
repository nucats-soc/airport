import type { Event } from '$lib/types/event';
import { getAcademicYear } from '$lib/util/academicYear';
import { formatLongDate, formatMonth } from '$lib/util/dateTime';
import type { CalendarSelection } from './types';

const INITIAL_MONTH_WINDOW = 3;

export const EARLIEST_EVENT_SELECTION: Readonly<CalendarSelection> = {
	year: 2026,
	month: 7
};

export function latestEventSelection(today: Date = new Date()): CalendarSelection {
	return { year: getAcademicYear(today) + 1, month: 6 };
}

export function isCalendarMonthBefore(
	selection: CalendarSelection,
	boundary: CalendarSelection
): boolean {
	return (
		selection.year < boundary.year ||
		(selection.year === boundary.year && selection.month < boundary.month)
	);
}

export function isCalendarMonthAfter(
	selection: CalendarSelection,
	boundary: CalendarSelection
): boolean {
	return (
		selection.year > boundary.year ||
		(selection.year === boundary.year && selection.month > boundary.month)
	);
}

export function selectionToDate(selection: CalendarSelection): Date {
	return new Date(Date.UTC(selection.year, selection.month, selection.day ?? 1));
}

export function dateToSelection(date: Date): CalendarSelection {
	return { year: date.getFullYear(), month: date.getMonth(), day: date.getDate() };
}

export function isSameDay(left: Date, right: Date): boolean {
	return (
		left.getFullYear() === right.getFullYear() &&
		left.getMonth() === right.getMonth() &&
		left.getDate() === right.getDate()
	);
}

export function isSameCalendarMonth(
	left: Pick<CalendarSelection, 'year' | 'month'>,
	right: Pick<CalendarSelection, 'year' | 'month'>
): boolean {
	return left.year === right.year && left.month === right.month;
}

export function isDateSelected(selection: CalendarSelection, date: Date): boolean {
	const target = dateToSelection(date);
	return (
		selection.day === target.day &&
		selection.month === target.month &&
		selection.year === target.year
	);
}

export function shiftCalendarMonth(
	selection: Pick<CalendarSelection, 'year' | 'month'>,
	offset: number
): CalendarSelection {
	const date = new Date(selection.year, selection.month + offset, 1);
	return { year: date.getFullYear(), month: date.getMonth() };
}

export function clampCalendarSelection(
	selection: CalendarSelection,
	today: Date = new Date()
): CalendarSelection {
	if (isCalendarMonthBefore(selection, EARLIEST_EVENT_SELECTION)) {
		return { ...EARLIEST_EVENT_SELECTION };
	}

	const latestSelection = latestEventSelection(today);
	if (isCalendarMonthAfter(selection, latestSelection)) {
		return latestSelection;
	}

	return selection;
}

export function formatSelectionHeading(selection: CalendarSelection): string {
	const date = selectionToDate(selection);
	return selection.day === undefined
		? `Events in ${formatMonth(date)}`
		: `Events on ${formatLongDate(date)}`;
}

export function isSelectionInPast(selection: CalendarSelection, now: Date = new Date()): boolean {
	if (selection.day !== undefined) {
		const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
		return new Date(selection.year, selection.month, selection.day) < startOfToday;
	}

	return (
		selection.year < now.getFullYear() ||
		(selection.year === now.getFullYear() && selection.month < now.getMonth())
	);
}

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
	const initialSelection = clampCalendarSelection(
		{ year: today.getFullYear(), month: today.getMonth() },
		today
	);
	const { year, month: currentMonth } = initialSelection;
	const latestSelection = latestEventSelection(today);

	for (let offset = 0; offset < INITIAL_MONTH_WINDOW; offset += 1) {
		const candidate = shiftCalendarMonth({ year, month: currentMonth }, offset);
		if (isCalendarMonthAfter(candidate, latestSelection)) {
			break;
		}
		const monthStart = new Date(candidate.year, candidate.month, 1, 0, 0, 0, 0).getTime();
		const nextMonthStart = new Date(candidate.year, candidate.month + 1, 1, 0, 0, 0, 0).getTime();
		if (
			events.some((event) => {
				const start = event.date.getTime();
				const end = getEventEndDate(event).getTime();
				return start < nextMonthStart && end >= monthStart;
			})
		) {
			return candidate;
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

	return shiftCalendarMonth(selection, 1);
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
