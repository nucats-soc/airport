<script lang="ts">
	import headerImage from '#lib/assets/headers/events.jpg?enhanced';
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import PageHeader from '#lib/components/PageHeader.svelte';
	import PageMetadata from '#lib/components/PageMetadata.svelte';
	import Spinner from '#lib/components/Spinner.svelte';
	import { academicYearOfMonth } from '#lib/util/academicYear.js';
	import { debounced } from '#lib/util/debounced.svelte.js';
	import CalendarSubscriptionCard from './_components/CalendarSubscriptionCard.svelte';
	import EventsBrowser from './_components/EventsBrowser.svelte';
	import { clampCalendarSelection } from './event-selection';
	import type { CalendarSelection } from './types';

	const today = new Date();
	let selection = $state<CalendarSelection>(
		clampCalendarSelection({ year: today.getFullYear(), month: today.getMonth() })
	);

	// Wait for the selection to settle before fetching another academic year, so clicking
	// quickly through months doesn't fire a request for every year passed on the way.
	const academicYear = debounced(() => academicYearOfMonth(selection.year, selection.month), 1000);
</script>

<PageMetadata
	title="Events"
	description="See upcoming events from Newcastle University's Computing and Technology Society."
/>

<div class="page-container flex flex-col gap-md">
	<PageHeader
		image={headerImage}
		title="Event Schedule"
		description="See what we're doing and come along."
	/>

	<svelte:boundary>
		<EventsBrowser academicYear={academicYear()} bind:selection />

		{#snippet pending()}
			<Spinner label="Loading events" class="w-full py-8" />
		{/snippet}

		{#snippet failed(_error, reset)}
			<div class="box flex flex-col items-center gap-sm py-8 text-center" role="alert">
				<p class="tx-base">Events could not be loaded.</p>
				<ActionButton variant="secondary" onclick={reset}>
					<span class="icon-[material-symbols--refresh] size-4" aria-hidden="true"></span>
					Try again
				</ActionButton>
			</div>
		{/snippet}
	</svelte:boundary>

	<CalendarSubscriptionCard />
</div>
