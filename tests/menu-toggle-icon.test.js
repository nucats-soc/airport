import assert from 'node:assert/strict';
import test from 'node:test';
import { createServer } from 'vite';

test('MenuToggleIcon animates between hamburger and close states', async () => {
	const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

	try {
		const { default: MenuToggleIcon } = await server.ssrLoadModule(
			'/src/routes/_components/MenuToggleIcon.svelte'
		);
		const { render } = await server.ssrLoadModule('svelte/server');

		const closed = render(MenuToggleIcon, { props: { isOpen: false } }).body;
		assert.match(closed, /material-symbols--menu-rounded/);
		assert.match(closed, /opacity-100/);
		assert.match(closed, /rotate-0/);
		assert.match(closed, /scale-100/);
		assert.match(closed, /material-symbols--close-rounded/);
		assert.match(closed, /opacity-0/);
		assert.match(closed, /rotate-90/);
		assert.match(closed, /scale-75/);

		const open = render(MenuToggleIcon, { props: { isOpen: true } }).body;
		assert.match(open, /material-symbols--menu-rounded/);
		assert.match(open, /-rotate-90/);
		assert.match(open, /scale-75/);
		assert.match(open, /material-symbols--close-rounded/);
		assert.match(open, /opacity-100/);
		assert.match(open, /rotate-0/);
		assert.match(open, /scale-100/);

		assert.match(open, /motion-reduce:transition-none/);
		assert.equal(open.match(/inset-0/g)?.length, 2);
	} finally {
		await server.close();
	}
});
