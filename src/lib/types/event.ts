import type { Place } from './place';

export type EventStatus = 'Confirmed' | 'Planned' | 'Draft' | 'Completed' | 'Cancelled';

interface EventDetails {
	id: string;
	createdAt: Date;
	lastEditedAt: Date;
	name: string;
	type: string;
	status: EventStatus;
	iconSvg: string;
	color: EventColor;
	location?: Place;
	room?: string;
	description?: string;
	url?: string;
}

export type EventTiming =
	| {
			allDay: true;
			date: Date;
			durationDays: number;
			durationMinutes?: never;
	  }
	| {
			allDay: false;
			date: Date;
			durationDays?: never;
			durationMinutes?: number;
	  };

export type Event = EventDetails & EventTiming;

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
