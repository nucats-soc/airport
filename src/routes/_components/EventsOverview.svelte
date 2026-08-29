<script lang="ts">
	import { browser } from '$app/environment';
	import Container from '$lib/components/layout/Container.svelte';
	import EventCard from '$lib/components/domain/EventCard.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';
	import Loadable from '$lib/components/ui/Loadable.svelte';
	import { getUpcomingEventsPreview } from '../home.remote';

	let eventsQuery = $derived(browser ? getUpcomingEventsPreview() : undefined);
	let events = $derived(eventsQuery?.current ?? []);
	let eventSummary = $derived(
		events.length === 0
			? 'There are no upcoming events.'
			: events.length === 1
				? 'There is one upcoming event.'
				: `There are ${events.length} upcoming events.`
	);
</script>

<Container extraClass="py-8">
	<section aria-labelledby="upcoming-events-title">
		<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
			<div>
				<h2 id="upcoming-events-title" class="tx-section-title">Upcoming Events</h2>
				{#if eventsQuery && !eventsQuery.loading && !eventsQuery.error}
					<p class="tx-body">{eventSummary}</p>
				{/if}
			</div>

			<LinkButton type="secondary" href="/events">View All</LinkButton>
		</div>

		<Loadable
			state={eventsQuery}
			loadingLabel="Loading upcoming events"
			errorMessage="Upcoming events could not be loaded."
			extraClass="w-full py-8"
		>
			{#if events.length > 0}
				<div class="mt-4 flex flex-col gap-3">
					{#each events as event (event.id)}
						<EventCard {event} />
					{/each}
				</div>
			{/if}
		</Loadable>
	</section>
</Container>
