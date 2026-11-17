<script lang="ts">
	import { getHref } from '#lib/links.js';
	import EventCard from '#lib/components/domain/EventCard.svelte';
	import LinkButton from '#lib/components/button/LinkButton.svelte';
	import Spinner from '#lib/components/Spinner.svelte';
	import { getUpcomingEventsPreview } from '../home.remote';

	function summarise(count: number): string {
		if (count === 0) return 'There are no upcoming events.';
		if (count === 1) return 'There is one upcoming event.';
		return `There are ${count} upcoming events.`;
	}
</script>

{#snippet header(summary?: string)}
	<div class="flex flex-col items-start gap-sm sm:flex-row sm:items-center sm:justify-between">
		<div>
			<h2 id="upcoming-events-title" class="tx-header-2">Upcoming Events</h2>
			{#if summary}
				<p class="tx-base">{summary}</p>
			{/if}
		</div>
		<LinkButton type="secondary" href={getHref('events')}>View All</LinkButton>
	</div>
{/snippet}

<section class="page-container py-8" aria-labelledby="upcoming-events-title">
	<svelte:boundary>
		{@const events = await getUpcomingEventsPreview()}
		{@render header(summarise(events.length))}
		{#if events.length > 0}
			<div class="mt-sm flex flex-col gap-3">
				{#each events as event (event.id)}
					<EventCard {event} />
				{/each}
			</div>
		{/if}

		{#snippet pending()}
			{@render header()}
			<Spinner label="Loading upcoming events" class="w-full py-8" />
		{/snippet}

		{#snippet failed()}
			{@render header()}
			<p class="tx-base py-8">Upcoming events could not be loaded.</p>
		{/snippet}
	</svelte:boundary>
</section>
