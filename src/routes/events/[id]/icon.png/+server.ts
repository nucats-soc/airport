import { error, type RequestHandler } from '@sveltejs/kit';
import sharp from 'sharp';
import { cache, EVENT_ICON_CACHE_TTL } from '$lib/server/cache';
import { getEventById } from '$lib/server/notion/events';
import { buildEventIconSvg, EVENT_HEX_COLORS } from '$lib/util/event';

export const GET: RequestHandler = async ({ params }) => {
	if (!params.id) {
		error(400, 'Event id is required');
	}

	const event = await getEventById(params.id);

	if (!event) {
		error(404, 'Event not found');
	}

	const cacheKey = `event-icon:${event.id}:${event.lastEditedAt.getTime()}`;
	const png = await cache.wrap(
		cacheKey,
		() =>
			sharp(
				Buffer.from(
					buildEventIconSvg({
						iconSvg: event.iconSvg,
						background: EVENT_HEX_COLORS[event.color]
					})
				)
			)
				.png()
				.toBuffer(),
		EVENT_ICON_CACHE_TTL
	);
	const body = new ArrayBuffer(png.byteLength);
	new Uint8Array(body).set(png);

	return new Response(body, {
		headers: {
			'cache-control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
			'content-type': 'image/png'
		}
	});
};
