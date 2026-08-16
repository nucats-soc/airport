import type { Place } from './place';

export interface Event {
	id: string;
	name: string;
	iconSvg: string;
	color: EventColor;
	date: Date;
	location?: Place;
	room?: string;
	hasTime: boolean;
	description?: string;
}

export type EventColor =
	| 'gray'
	| 'brown'
	| 'orange'
	| 'yellow'
	| 'green'
	| 'blue'
	| 'purple'
	| 'pink'
	| 'red';
