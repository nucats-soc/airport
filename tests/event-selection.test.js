import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('eventsForSelection filters by month and optional day', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { eventsForSelection } = await server.ssrLoadModule(
			'/src/routes/events/event-selection.ts'
		);
		const events = [
			{ id: 'first', date: new Date(2026, 7, 4) },
			{ id: 'second', date: new Date(2026, 7, 18) },
			{ id: 'other-month', date: new Date(2026, 8, 4) }
		];

		assert.deepEqual(eventsForSelection(events, { year: 2026, month: 7 }), events.slice(0, 2));
		assert.deepEqual(eventsForSelection(events, { year: 2026, month: 7, day: 18 }), [events[1]]);
	} finally {
		await server.close();
	}
});

test('nextCalendarSelection widens a day and advances a month', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { nextCalendarSelection } = await server.ssrLoadModule(
			'/src/routes/events/event-selection.ts'
		);

		assert.deepEqual(nextCalendarSelection({ year: 2026, month: 7, day: 18 }), {
			year: 2026,
			month: 7
		});
		assert.deepEqual(nextCalendarSelection({ year: 2026, month: 11 }), {
			year: 2027,
			month: 0
		});
	} finally {
		await server.close();
	}
});
