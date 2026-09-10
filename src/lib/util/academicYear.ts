export function getAcademicYear(date: Date = new Date()): number {
	return date.getMonth() >= 7 ? date.getFullYear() : date.getFullYear() - 1;
}

export function formatAcademicYear(year: number): string {
	return `${year}/${String((year + 1) % 100).padStart(2, '0')}`;
}
