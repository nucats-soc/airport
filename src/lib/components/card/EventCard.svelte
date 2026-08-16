<script lang="ts">
	import type { Event, EventColor } from '../../types/event.ts';
	import Card from '$lib/components/card/Card.svelte';
	import LinkButton from '$lib/components/button/LinkButton.svelte';

	let event: Event = $props();

	const EVENT_COLOR_CLASSES: Record<EventColor, string> = {
		gray: 'bg-gray-200 text-black',
		brown: 'bg-amber-200 text-black',
		orange: 'bg-orange-200 text-black',
		yellow: 'bg-yellow-200 text-black',
		green: 'bg-green-200 text-black',
		blue: 'bg-blue-200 text-black',
		purple: 'bg-purple-200 text-black',
		pink: 'bg-pink-200 text-black',
		red: 'bg-red-200 text-black'
	};

	function formatPlace(event: Event): string {
		return (
			[event.location?.name, event.room || event.location?.details].filter(Boolean).join(', ') ||
			event.location?.address ||
			event.room ||
			'TBD'
		);
	}

	let colorClasses: string = $derived(EVENT_COLOR_CLASSES[event.color]);
	let formattedDate = $derived(
		new Intl.DateTimeFormat('en-GB', {
			weekday: 'short',
			day: 'numeric',
			month: 'short',
			...(event.hasTime ? { hour: '2-digit', minute: '2-digit' } : {}),
			timeZone: event.hasTime ? 'Europe/London' : 'UTC'
		}).format(event.date)
	);
	let formattedPlace = $derived(formatPlace(event));
	let formattedUrl = $derived(`/events/${event.id}`);
</script>

<Card type="horizontal" padding="sm" extraClass="min-h-35">
	{#snippet thumbnail()}
		<div
			class={[
				'flex h-full w-full flex-col items-center justify-center px-6 py-5 text-center md:w-70',
				colorClasses
			]}
		>
			<span class="mb-2 inline-flex text-4xl" aria-hidden="true">
				{@html event.iconSvg}
			</span>
			<h3 class="tx-item-title">{event.name}</h3>
			<time class="tx-body" datetime={event.date.toISOString()}>{formattedDate}</time>
		</div>
	{/snippet}

	{#if event.description}
		<p class="tx-body">{event.description}</p>
	{/if}

	{#snippet footer()}
		<div class="flex w-full flex-wrap items-center justify-between gap-4">
			<div class="flex items-center gap-2">
				<span class="icon-[material-symbols--location-on] size-5 shrink-0" aria-hidden="true"
				></span>
				<span class="text-body">{formattedPlace}</span>
			</div>

			<LinkButton href={formattedUrl} type="secondary">Read More</LinkButton>
		</div>
	{/snippet}
</Card>
