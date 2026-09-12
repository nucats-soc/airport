export const ACADEMIC_YEAR_START_MONTH = 7;

export const EARLIEST_ACADEMIC_YEAR = 2026;

export interface YearMonth {
	year: number;
	month: number;
}

export function getAcademicYear(date: Date = new Date()): number {
	return date.getMonth() >= ACADEMIC_YEAR_START_MONTH ? date.getFullYear() : date.getFullYear() - 1;
}

export function formatAcademicYear(year: number): string {
	return `${year}/${String((year + 1) % 100).padStart(2, '0')}`;
}

export function academicYearOfMonth(year: number, month: number): number {
	return month >= ACADEMIC_YEAR_START_MONTH ? year : year - 1;
}

export function academicYearMonths(academicYear: number): YearMonth[] {
	const months: YearMonth[] = [];
	for (let month = ACADEMIC_YEAR_START_MONTH; month <= 11; month += 1) {
		months.push({ year: academicYear, month });
	}
	for (let month = 0; month < ACADEMIC_YEAR_START_MONTH; month += 1) {
		months.push({ year: academicYear + 1, month });
	}
	return months;
}

export function availableAcademicYears(today: Date = new Date()): number[] {
	const latestAcademicYear = getAcademicYear(today);
	const years: number[] = [];
	for (let year = EARLIEST_ACADEMIC_YEAR; year <= latestAcademicYear; year += 1) {
		years.push(year);
	}
	return years;
}

export function academicYearSelection(selection: YearMonth, academicYear: number): YearMonth {
	const year = selection.month >= ACADEMIC_YEAR_START_MONTH ? academicYear : academicYear + 1;
	return { year, month: selection.month };
}

export function yearOfLabel(label: string | null): number | null {
	if (!label) {
		return null;
	}

	const match = label.match(/(\d{4})/);
	if (!match) {
		return null;
	}

	return Number.parseInt(match[1], 10);
}
