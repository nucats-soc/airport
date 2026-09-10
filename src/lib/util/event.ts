import type { EventColor } from '$lib/types/event';

export function buildEventIconSvg({
	iconSvg,
	background
}: {
	iconSvg: string;
	background: string;
}): string {
	const sizedIconSvg = iconSvg
		.replace(/\s+width="[^"]*"/, '')
		.replace(/\s+height="[^"]*"/, '')
		.replace(
			'<svg ',
			'<svg x="48" y="48" width="160" height="160" color="#000000" fill="#000000" '
		);

	return [
		'<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">',
		`<rect width="256" height="256" fill="${background}"/>`,
		sizedIconSvg,
		'</svg>'
	].join('');
}

export const EVENT_HEX_COLORS = {
	gray: '#e5e7eb',
	brown: '#fde68a',
	orange: '#fed7aa',
	yellow: '#fef08a',
	green: '#bbf7d0',
	blue: '#bfdbfe',
	purple: '#e9d5ff',
	pink: '#fbcfe8',
	red: '#fecaca'
} satisfies Record<EventColor, string>;

export const EVENT_COLOR_CLASSES = {
	gray: 'bg-gray-200 text-black',
	brown: 'bg-amber-200 text-black',
	orange: 'bg-orange-200 text-black',
	yellow: 'bg-yellow-200 text-black',
	green: 'bg-green-200 text-black',
	blue: 'bg-blue-200 text-black',
	purple: 'bg-purple-200 text-black',
	pink: 'bg-pink-200 text-black',
	red: 'bg-red-200 text-black'
} satisfies Record<EventColor, string>;

export const EVENT_TEXT_COLOR_CLASSES = {
	gray: 'text-gray-200',
	brown: 'text-amber-200',
	orange: 'text-orange-200',
	yellow: 'text-yellow-200',
	green: 'text-green-200',
	blue: 'text-blue-200',
	purple: 'text-purple-200',
	pink: 'text-pink-200',
	red: 'text-red-200'
} satisfies Record<EventColor, string>;
