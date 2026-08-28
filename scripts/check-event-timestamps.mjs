import assert from 'node:assert/strict';
import { createServer } from 'vite';

const server = await createServer({ server: { middlewareMode: true } });

try {
	const { parsePageTimestamps } = await server.ssrLoadModule(
		'/src/lib/server/notion/pageTimestamps.ts'
	);
	const timestamps = parsePageTimestamps({
		created_time: '2026-08-20T10:15:30.000Z',
		last_edited_time: '2026-08-27T18:45:00.000Z'
	});

	assert.ok(timestamps.createdAt instanceof Date);
	assert.equal(timestamps.createdAt.toISOString(), '2026-08-20T10:15:30.000Z');
	assert.ok(timestamps.lastEditedAt instanceof Date);
	assert.equal(timestamps.lastEditedAt.toISOString(), '2026-08-27T18:45:00.000Z');
} finally {
	await server.close();
}
