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
