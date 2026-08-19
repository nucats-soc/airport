export function formatDate(date: Date, hasTime: boolean): string {
	return new Intl.DateTimeFormat('en-GB', {
		weekday: 'short',
		day: 'numeric',
		month: 'short',
		...(hasTime ? { hour: '2-digit', minute: '2-digit' } : {}),
		timeZone: hasTime ? 'Europe/London' : 'UTC'
	}).format(date);
}

export function formatDuration(totalMinutes: number): string {
	const days = Math.floor(totalMinutes / (24 * 60));
	const hours = Math.floor((totalMinutes % (24 * 60)) / 60);
	const minutes = totalMinutes % 60;

	return [
		days ? `${days} ${days === 1 ? 'day' : 'days'}` : '',
		hours ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '',
		minutes ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : ''
	]
		.filter(Boolean)
		.join(' ');
}
