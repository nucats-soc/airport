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
	import { eventsForSelection } from './event-selection';
	import { getEventsByYear } from './events.remote';
	import type { CalendarSelection } from './types';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import headerImage from '$lib/assets/nucats-bae.jpg';

	let selection = $state<CalendarSelection>({
		year: new Date().getFullYear(),
		month: new Date().getMonth()
	});

	let eventsQuery = $derived(browser ? getEventsByYear(selection.year) : undefined);
	let events = $derived(eventsQuery?.current ?? []);
	let visibleEvents = $derived(eventsForSelection(events, selection));
</script>

<svelte:head>
	<title>Events - NUCATS</title>
	<meta
		name="description"
		content="See upcoming events from Newcastle University's Computing and Technology Society."
	/>
</svelte:head>

<Container>
	<Stack gap="sm">
		<PageHeader
			image={headerImage}
			title="Event Schedule"
			description="See what we're doing and come along."
		/>
		<div class="grid gap-4 lg:min-h-180 lg:grid-cols-3 lg:items-start">
			<div class="contents lg:order-2 lg:col-start-3 lg:row-start-1 lg:grid lg:gap-4">
				<div class="order-1 lg:order-none">
					<CalendarCard {events} {selection} onUpdateSelection={(next) => (selection = next)} />
				</div>
				<div class="order-3 lg:order-none">
					<DiscordEventInfo />
				</div>
			</div>

			<div class="order-2 lg:order-1 lg:col-span-2 lg:row-start-1">
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
								onUpdateSelection={(next) => (selection = next)}
							/>
						</div>
					</div>
				</Loadable>
			</div>

			<div class="order-4 lg:order-3 lg:col-span-3">
				<CalendarSubscriptionCard />
			</div>
		</div>
	</Stack>
</Container>
