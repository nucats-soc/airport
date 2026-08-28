import type { Place } from './place';

export interface Event {
	id: string;
	createdAt: Date;
	lastEditedAt: Date;
	name: string;
	type: string;
	iconSvg: string;
	color: EventColor;
	date: Date;
	durationMinutes?: number;
	location?: Place;
	room?: string;
	description?: string;
	url?: string;
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
