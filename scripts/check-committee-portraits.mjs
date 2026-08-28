import assert from 'node:assert/strict';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom' });

try {
	const { committeePortraitPath } = await vite.ssrLoadModule(
		'/src/lib/server/committeePortrait.ts'
	);
	const member = {
		id: 'member-1',
		imageUrl: 'https://files.example.com/photo.jpg?signature=first'
	};

	assert.equal(
		committeePortraitPath(member),
		committeePortraitPath({
			...member,
			imageUrl: `${member.imageUrl.split('?')[0]}?signature=second`
		}),
		'renewing an upstream signature must not invalidate the browser cache'
	);
	assert.notEqual(
		committeePortraitPath(member),
		committeePortraitPath({ ...member, imageUrl: 'https://files.example.com/replacement.jpg' }),
		'replacing a portrait must change its browser URL'
	);
	assert.equal(
		committeePortraitPath({ id: member.id }),
		undefined,
		'members without portraits must keep using the fallback'
	);
	assert.equal(
		committeePortraitPath({ id: member.id, imageUrl: 'not a URL' }),
		undefined,
		'malformed upstream URLs must not reach the image proxy'
	);
} finally {
	await vite.close();
}
