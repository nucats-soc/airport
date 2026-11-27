import assert from 'node:assert/strict';
import { after, test } from 'node:test';
import { createServer } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

const server = await createServer({
	configFile: false,
	plugins: [svelte({ configFile: false, emitCss: false, compilerOptions: { runes: true } })],
	server: { watch: null },
	resolve: { alias: { '#lib': new URL('../src/lib', import.meta.url).pathname } }
});

after(async () => {
	await server.close();
});

const serverModule = await server.ssrLoadModule('svelte/server');
/** @type {typeof import('svelte/server').render} */
const render = serverModule.render;
const linkModule = await server.ssrLoadModule('/src/lib/links.ts');
/** @type {typeof import('../src/lib/links.js').getLink} */
const getLink = linkModule.getLink;

async function renderComponent(/** @type {string} */ path) {
	const { default: component } = await server.ssrLoadModule(path);
	return render(component).body;
}

test('changing the Discord destination once updates every shared Discord call to action', async () => {
	const link = getLink('discord');
	const originalHref = link.href;
	link.href = 'https://example.org/new-discord-invite';
	try {
		for (const path of [
			'/src/routes/_components/Footer.svelte',
			'/src/routes/_components/Socials.svelte',
			'/src/routes/_components/Hero.svelte',
			'/src/routes/events/_components/DiscordEventInfo.svelte'
		]) {
			const html = await renderComponent(path);
			assert.match(html, /href="https:\/\/example\.org\/new-discord-invite"/, path);
			assert.doesNotMatch(html, /href="https:\/\/discord\.gg\//, path);
		}
	} finally {
		link.href = originalHref;
	}
});

test('the membership destination is shared by hero and footer buttons', async () => {
	const link = getLink('join');
	const originalHref = link.href;
	link.href = 'https://example.org/new-membership-page';
	try {
		for (const path of [
			'/src/routes/_components/Footer.svelte',
			'/src/routes/_components/Hero.svelte'
		]) {
			const html = await renderComponent(path);
			assert.match(html, /href="https:\/\/example\.org\/new-membership-page"/, path);
		}
	} finally {
		link.href = originalHref;
	}
});

test('calendar subscription cards resolve their destination from the registry', async () => {
	const link = getLink('events-subscribe');
	const originalHref = link.href;
	link.href = '/calendar-subscription';
	try {
		const html = await renderComponent(
			'/src/routes/events/_components/CalendarSubscriptionCard.svelte'
		);
		assert.match(html, /href="\/calendar-subscription"/);
	} finally {
		link.href = originalHref;
	}
});
