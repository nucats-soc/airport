import type { EventColor } from '$lib/types/event';

const EVENT_ICON_SIZE = 256;
const EVENT_ICON_PADDING = 48;
const EVENT_ICON_CONTENT_SIZE = EVENT_ICON_SIZE - EVENT_ICON_PADDING * 2;
const SVG_DIMENSION_ATTRIBUTES = /\s+(width|height)=["'][^"']*["']/gi;

export function buildEventIconSvg({
	iconSvg,
	background
}: {
	iconSvg: string;
	background: string;
}): string {
	const sizedIconSvg = iconSvg
		.replace(SVG_DIMENSION_ATTRIBUTES, '')
		.replace(
			'<svg ',
			`<svg x="${EVENT_ICON_PADDING}" y="${EVENT_ICON_PADDING}" width="${EVENT_ICON_CONTENT_SIZE}" height="${EVENT_ICON_CONTENT_SIZE}" style="filter: brightness(0)" `
		);

	return [
		`<svg xmlns="http://www.w3.org/2000/svg" width="${EVENT_ICON_SIZE}" height="${EVENT_ICON_SIZE}" viewBox="0 0 ${EVENT_ICON_SIZE} ${EVENT_ICON_SIZE}">`,
		`<rect width="${EVENT_ICON_SIZE}" height="${EVENT_ICON_SIZE}" fill="${background}"/>`,
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
