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

export function initialCalendarSelection<T extends Pick<Event, 'date'>>(
	events: T[],
	today: Date = new Date()
): CalendarSelection {
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
		if (
			events.some(
				(event) =>
					event.date.getFullYear() === candidate.year && event.date.getMonth() === candidate.month
			)
		) {
			return candidate;
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

	return shiftCalendarMonth(selection, 1);
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
