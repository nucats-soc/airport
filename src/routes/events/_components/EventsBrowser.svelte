<script lang="ts">
	import { untrack } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import EventCard from '#lib/components/domain/EventCard.svelte';
	import Spinner from '#lib/components/Spinner.svelte';
	import { academicYearOfMonth } from '#lib/util/academicYear.js';
	import {
		clampCalendarSelection,
		eventsForSelection,
		formatSelectionHeading,
		initialCalendarSelection,
		isSameCalendarMonth,
		partitionEventsByDate
	} from '../event-selection';
	import { getEventsByAcademicYear } from '../events.remote';
	import type { CalendarSelection } from '../types';
	import CalendarCard from './CalendarCard.svelte';
	import DiscordEventInfo from './DiscordEventInfo.svelte';
	import EndOfResultsCard from './EndOfResultsCard.svelte';
	import EventFilters from './EventFilters.svelte';
	import EventsDisclosure from './EventsDisclosure.svelte';

	interface Props {
		/** The academic year to load events for. */
		academicYear: number;
		selection: CalendarSelection;
	}

	let { academicYear, selection = $bindable() }: Props = $props();

	let eventsQuery = $derived(getEventsByAcademicYear(academicYear));
	// Handle failures here instead of letting them reach the page's error boundary, so the
	// calendar stays usable (moving to another academic year refetches) and the list can retry.
	let loadedEvents = $derived(await eventsQuery.catch(() => undefined));
	let loadFailed = $derived(loadedEvents === undefined);
	let events = $derived(loadedEvents ?? []);

	// Once the first events have loaded, jump to the first month that actually has events.
	selection = initialCalendarSelection(untrack(() => events));

	let eventTypeFilters = $state<string[]>([]);
	let tagFilters = $state<string[]>([]);

	// True while the selected month's academic year is still being debounced or fetched.
	// Uses the query's own loading flag rather than `$effect.pending()`: in this Svelte version,
	// reading `$effect.pending()` here sent the page into an endless update loop (frozen tab)
	// whenever a new academic year's events, or a retried request, finished loading.
	let loading = $derived(
		academicYearOfMonth(selection.year, selection.month) !== academicYear || eventsQuery.loading
	);

	let eventsInSelection = $derived(eventsForSelection(events, selection));
	let visibleEvents = $derived(
		eventsInSelection.filter(
			(event) =>
				(eventTypeFilters.length === 0 || eventTypeFilters.includes(event.type)) &&
				(tagFilters.length === 0 || event.tags.some((tag) => tagFilters.includes(tag)))
		)
	);
	let partitionedEvents = $derived(partitionEventsByDate(visibleEvents, selection));

	function retry() {
		// A failed retry is reflected in `loadFailed`; nothing else to handle here.
		eventsQuery.refresh().catch(() => {});
	}

	function updateSelection(nextSelection: CalendarSelection) {
		const clampedSelection = clampCalendarSelection(nextSelection);
		const monthChanged = !isSameCalendarMonth(selection, clampedSelection);

		selection = clampedSelection;

		if (monthChanged) {
			window.scrollTo({ top: 0, behavior: prefersReducedMotion.current ? 'auto' : 'smooth' });
		}
	}
</script>

<div class="grid gap-sm lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start lg:gap-md">
	<aside class="contents lg:order-2 lg:grid lg:gap-sm">
		<div class="order-1 lg:order-0">
			<CalendarCard {events} {selection} onUpdateSelection={updateSelection} />
		</div>
		<div class="order-3 lg:order-0">
			<DiscordEventInfo />
		</div>
	</aside>

	<section class="order-2 min-w-0 lg:order-1" aria-labelledby="events-list-title">
		<div class="mb-sm flex items-center justify-between gap-sm px-1">
			<h2 id="events-list-title" class="tx-header-2">
				{formatSelectionHeading(selection)}
			</h2>
			{#if !loading && !loadFailed}
				<EventFilters events={eventsInSelection} bind:eventTypeFilters bind:tagFilters />
			{/if}
		</div>

		{#if loading}
			<Spinner label="Loading events" class="w-full py-8" />
		{:else if loadFailed}
			<div class="box flex flex-col items-center gap-sm py-8 text-center" role="alert">
				<p class="tx-base">Events could not be loaded.</p>
				<ActionButton variant="secondary" onclick={retry}>
					<span class="icon-[material-symbols--refresh] size-4" aria-hidden="true"></span>
					Try again
				</ActionButton>
			</div>
		{:else}
			{@const { previousEvents, plannedEvents, upcomingEvents } = partitionedEvents}
			<div class="grid gap-sm">
				{#if previousEvents.length > 0}
					<EventsDisclosure
						events={previousEvents}
						kind="previous"
						class={plannedEvents.length === 0 ? 'mb-6 sm:mb-8' : undefined}
					/>
				{/if}
				{#if plannedEvents.length > 0}
					<EventsDisclosure events={plannedEvents} kind="planned" class="mb-6 sm:mb-8" />
				{/if}
				{#each upcomingEvents as event (event.id)}
					<EventCard {event} />
				{/each}
				<EndOfResultsCard events={visibleEvents} {selection} onUpdateSelection={updateSelection} />
			</div>
		{/if}
	</section>
</div>
