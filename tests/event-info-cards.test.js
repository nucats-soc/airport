import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('Event action cards share the same text and full-width action treatment', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { default: DiscordEventInfo } = await server.ssrLoadModule(
			'/src/routes/events/_components/DiscordEventInfo.svelte'
		);
		const { default: CalendarSubscriptionCard } = await server.ssrLoadModule(
			'/src/routes/events/_components/CalendarSubscriptionCard.svelte'
		);
		const { render } = await server.ssrLoadModule('svelte/server');

		for (const component of [DiscordEventInfo, CalendarSubscriptionCard]) {
			const { body } = render(component);
			assert.match(body, /class="[^"]*tx-card-title[^"]*"/);
			assert.match(body, /class="[^"]*tx-body[^"]*text-zinc-300[^"]*"/);
			assert.match(body, /<a[^>]*class="[^"]*w-full[^"]*"/);
			assert.match(body, /class="[^"]*p-8[^"]*"/);
		}

		const { body: subscriptionBody } = render(CalendarSubscriptionCard);
		assert.match(subscriptionBody, /lg:flex-row/);
		assert.match(subscriptionBody, /lg:w-auto/);
		assert.match(
			subscriptionBody,
			/icon-\[material-symbols--calendar-add-on-outline\][^"]*size-8[^"]*text-green-300/
		);
	} finally {
		await server.close();
	}
});
