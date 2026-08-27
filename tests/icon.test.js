import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('Icon renders one of three decorative icon sizes', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { default: Icon } = await server.ssrLoadModule('/src/lib/components/ui/Icon.svelte');
		const { render } = await server.ssrLoadModule('svelte/server');
		const expectedClasses = {
			sm: 'size-4',
			md: 'size-6',
			lg: 'size-8'
		};

		for (const [size, expectedClass] of Object.entries(expectedClasses)) {
			const { body } = render(Icon, {
				props: { icon: 'icon-[material-symbols--home-outline]', size, extraClass: 'text-green-300' }
			});

			assert.match(body, new RegExp(`class="[^"]*${expectedClass}[^"]*"`));
			assert.match(body, /class="[^"]*text-green-300[^"]*"/);
			assert.match(body, /aria-hidden="true"/);
		}
	} finally {
		await server.close();
	}
});
