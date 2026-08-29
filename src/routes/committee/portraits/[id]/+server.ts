import { error } from '@sveltejs/kit';
import { getCommitteeMembers } from '$lib/server/notion/committee';
import * as v from 'valibot';
import type { RequestHandler } from './$types';

const committeeMemberIdSchema = v.pipe(v.string(), v.uuid());
const PORTRAIT_CACHE_CONTROL = 'public, max-age=86400, stale-while-revalidate=604800';

export const GET: RequestHandler = async ({ fetch, params }) => {
	const parsedId = v.safeParse(committeeMemberIdSchema, params.id);

	if (!parsedId.success) {
		error(404, 'Portrait not found');
	}

	const member = (await getCommitteeMembers()).find(({ id }) => id === parsedId.output);

	if (!member?.imageUrl) {
		error(404, 'Portrait not found');
	}

	const upstreamResponse = await fetch(member.imageUrl);
	const contentType = upstreamResponse.headers.get('content-type');

	if (!upstreamResponse.ok || !upstreamResponse.body || !contentType?.startsWith('image/')) {
		error(502, 'Portrait could not be loaded');
	}

	return new Response(upstreamResponse.body, {
		headers: {
			'cache-control': PORTRAIT_CACHE_CONTROL,
			'content-type': contentType
		}
	});
};
