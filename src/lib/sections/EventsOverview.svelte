<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import EventCard from '$lib/components/card/EventCard.svelte';
	import LinkButton from '$lib/components/button/LinkButton.svelte';

	import type { Event } from '$lib/types/event';

	interface Props {
		events: Event[];
	}

	let { events }: Props = $props();
	let eventSummary = $derived(
		events.length === 0
			? 'There are no upcoming events.'
			: events.length === 1
				? 'There is one upcoming event.'
				: `There are ${events.length} upcoming events.`
	);
</script>

<Container>
	<section aria-labelledby="upcoming-events-title">
		<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 id="upcoming-events-title" class="tx-section-title">Upcoming Events</h2>
				<p class="tx-body">{eventSummary}</p>
			</div>

			<LinkButton type="secondary" href="/events">View All</LinkButton>
		</div>

		{#if events.length > 0}
			<div class="mt-4 flex flex-col gap-3">
				{#each events as event (event.id)}
					<EventCard {...event} />
				{/each}
			</div>
		{/if}
	</section>
</Container>
