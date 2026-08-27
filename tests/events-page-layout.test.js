import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('Events page puts the calendar first on mobile and the Events Feed below all page content', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { default: EventsPage } = await server.ssrLoadModule('/src/routes/events/+page.svelte');
		const { render } = await server.ssrLoadModule('svelte/server');
		const { body } = render(EventsPage);

		assert.match(body, /class="contents [^"]*lg:grid[^"]*"/);
		assert.match(body, /order-1 lg:order-none/);
		assert.match(body, /order-2 lg:order-1 lg:col-span-2/);
		assert.match(body, /order-3 lg:order-none/);
		assert.match(body, /order-4 lg:order-3 lg:col-span-3/);

		const discordCard = body.indexOf('Stay Connected');
		const subscriptionCard = body.indexOf('Events Feed');
		assert.ok(discordCard >= 0);
		assert.ok(subscriptionCard > discordCard);
	} finally {
		await server.close();
	}
});
