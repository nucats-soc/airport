import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('CalendarMonth uses the floating dropdown with a larger mobile month grid', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { default: CalendarMonth } = await server.ssrLoadModule(
			'/src/routes/events/_components/CalendarMonth.svelte'
		);
		const { render } = await server.ssrLoadModule('svelte/server');
		const { body } = render(CalendarMonth, {
			props: {
				selection: { year: 2026, month: 7 },
				onUpdateSelection: () => {}
			}
		});

		assert.match(body, /aria-label="Previous month"/);
		assert.match(body, /aria-label="Next month"/);
		assert.match(body, /aria-expanded="false"/);
		assert.match(body, /aria-controls="[^" ]+"/);
		assert.match(body, /absolute top-full/);
		assert.match(body, /w-72 sm:w-auto/);
		assert.match(body, /min-h-11/);
		assert.match(body, />Jan<|>Feb<|>Mar</);
	} finally {
		await server.close();
	}
});
