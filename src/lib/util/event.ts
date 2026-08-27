import type { EventColor } from '$lib/types/event';

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
