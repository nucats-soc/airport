import { error } from '@sveltejs/kit';
import { getRequestEvent } from '$app/server';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const limiters = new Map<string, RateLimiterMemory>();

function limiterFor(scope: string, intervalMilliseconds: number): RateLimiterMemory {
	const key = `${scope}:${intervalMilliseconds}`;
	let limiter = limiters.get(key);

	if (!limiter) {
		limiter = new RateLimiterMemory({
			points: 1,
			duration: intervalMilliseconds / 1000
		});
		limiters.set(key, limiter);
	}

	return limiter;
}

export async function rateLimit(scope: string, intervalMilliseconds = 1_000): Promise<void> {
	const { getClientAddress } = getRequestEvent();
	const key = `${scope}:${getClientAddress()}`;

	try {
		await limiterFor(scope, intervalMilliseconds).consume(key);
	} catch {
		error(429, 'Too many requests. Please wait a moment and try again.');
	}
}
