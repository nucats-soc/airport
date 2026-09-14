import type { Place } from './place';

export type EventStatus = 'Confirmed' | 'Planned' | 'Draft' | 'Completed' | 'Cancelled';

export interface Event {
	id: string;
	createdAt: Date;
	lastEditedAt: Date;
	name: string;
	type: string;
	status: EventStatus;
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
