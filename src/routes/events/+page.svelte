<script lang="ts">
	import { browser } from '$app/environment';
	import EventCard from '$lib/components/domain/EventCard.svelte';
	import Container from '$lib/components/layout/Container.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Loadable from '$lib/components/ui/Loadable.svelte';
	import CalendarCard from './_components/CalendarCard.svelte';
	import CalendarSubscriptionCard from './_components/CalendarSubscriptionCard.svelte';
	import DiscordEventInfo from './_components/DiscordEventInfo.svelte';
	import EndOfResultsCard from './_components/EndOfResultsCard.svelte';
	import { eventsForSelection, initialCalendarSelection } from './event-selection';
	import { getEventsByYear } from './events.remote';
	import type { CalendarSelection } from './types';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import headerImage from '$lib/assets/headers/events.jpg';

	let selection = $state<CalendarSelection>({
		year: new Date().getFullYear(),
		month: new Date().getMonth()
	});
	let initialSelectionApplied = $state(false);

	let eventsQuery = $derived(browser ? getEventsByYear(selection.year) : undefined);
	let events = $derived(eventsQuery?.current ?? []);
	let visibleEvents = $derived(eventsForSelection(events, selection));

	$effect(() => {
		if (initialSelectionApplied || !eventsQuery || eventsQuery.loading || eventsQuery.error) {
			return;
		}

		selection = initialCalendarSelection(events);
		initialSelectionApplied = true;
	});

	function updateSelection(nextSelection: CalendarSelection) {
		initialSelectionApplied = true;
		selection = nextSelection;
	}

	const monthFormatter = new Intl.DateTimeFormat('en-GB', {
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
	const dayFormatter = new Intl.DateTimeFormat('en-GB', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	});
	let selectionHeading = $derived.by(() => {
		const date = new Date(Date.UTC(selection.year, selection.month, selection.day ?? 1));
		return selection.day === undefined
			? `Events in ${monthFormatter.format(date)}`
			: `Events on ${dayFormatter.format(date)}`;
	});
</script>

<svelte:head>
	<title>Events - NUCATS</title>
	<meta
		name="description"
		content="See upcoming events from Newcastle University's Computing and Technology Society."
	/>
</svelte:head>

<Container>
	<Stack gap="md">
		<PageHeader
			image={headerImage}
			title="Event Schedule"
			description="See what we're doing and come along."
		/>
		<div class="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-6">
			<aside class="contents lg:order-2 lg:grid lg:gap-4">
				<div class="order-1 lg:order-0">
					<CalendarCard {events} {selection} onUpdateSelection={updateSelection} />
				</div>
				<div class="order-3 lg:order-0">
					<DiscordEventInfo />
				</div>
			</aside>

			<section class="order-2 min-w-0 lg:order-1" aria-labelledby="events-list-title">
				<div class="mb-4 flex items-baseline justify-between gap-4 px-1">
					<h2 id="events-list-title" class="tx-section-title">{selectionHeading}</h2>
					{#if eventsQuery && !eventsQuery.loading && !eventsQuery.error}
						<p class="tx-body shrink-0 text-zinc-400">
							{visibleEvents.length}
							{visibleEvents.length === 1 ? 'event' : 'events'}
						</p>
					{/if}
				</div>
				<Loadable
					state={eventsQuery}
					loadingLabel="Loading events"
					errorMessage="Events could not be loaded."
					extraClass="w-full py-8"
				>
					<div
						class={[
							'w-full',
							visibleEvents.length === 0 ? 'flex items-center justify-center' : 'self-start'
						]}
					>
						<div class="grid gap-4">
							{#each visibleEvents as event}
								<EventCard {event} />
							{/each}
							<EndOfResultsCard
								events={visibleEvents}
								{selection}
								onUpdateSelection={updateSelection}
							/>
						</div>
					</div>
				</Loadable>
			</section>
		</div>

		<CalendarSubscriptionCard />
	</Stack>
</Container>
