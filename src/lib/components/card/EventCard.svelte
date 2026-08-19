<script lang="ts">
	import type { Event } from '../../types/event.ts';
	import Card from '$lib/components/card/Card.svelte';
	import LinkButton from '$lib/components/button/LinkButton.svelte';
	import { formatDate } from '$lib/util/dateTime';
	import { EVENT_COLOR_CLASSES } from '$lib/util/event';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();

	function formatPlace(event: Event): string {
		return (
			[event.location?.name, event.room].filter(Boolean).join(', ') ||
			event.location?.address ||
			'TBD'
		);
	}

	let colorClasses: string = $derived(EVENT_COLOR_CLASSES[event.color]);
	let formattedDate = $derived(formatDate(event.date, event.hasTime));
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
