import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('PageHeader overlays readable text near the bottom of its image', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { default: PageHeader } = await server.ssrLoadModule(
			'/src/lib/components/ui/PageHeader.svelte'
		);
		const { render } = await server.ssrLoadModule('svelte/server');
		const { body } = render(PageHeader, {
			props: {
				image: '/header.jpg',
				title: 'Committee',
				description: 'Meet the team running NUCATS.'
			}
		});

		assert.match(body, /class="[^"]*relative[^"]*"/);
		assert.match(body, /<img[^>]*src="\/header\.jpg"/);
		assert.match(body, /class="[^"]*aspect-video[^"]*sm:aspect-3\/1[^"]*"/);
		assert.match(body, /class="[^"]*absolute inset-0[^"]*"/);
		assert.match(body, /class="[^"]*items-end[^"]*"/);
		assert.match(body, /class="[^"]*bg-linear-to-t[^"]*"/);
		assert.match(body, /class="[^"]*from-black\/80[^"]*"/);
		assert.match(body, /class="[^"]*p-4[^"]*sm:p-8[^"]*"/);
		assert.match(body, /<h1[^>]*>Committee<\/h1>/);
		assert.match(body, /<p[^>]*>Meet the team running NUCATS\.<\/p>/);
	} finally {
		await server.close();
	}
});
