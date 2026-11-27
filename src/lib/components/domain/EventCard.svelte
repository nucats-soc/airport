<script lang="ts">
	import LinkButton from '#lib/components/button/LinkButton.svelte';
	import TimeDisplay from '#lib/components/TimeDisplay.svelte';
	import type { Event } from '#lib/types/event.js';
	import {
		EVENT_COLOR_CLASSES,
		EVENT_RAIL_CLASSES,
		EVENT_TEXT_COLOR_CLASSES
	} from '#lib/util/event.js';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();

	let formattedPlace = $derived(
		[event.location?.name, event.room].filter(Boolean).join(', ') ||
			event.location?.address ||
			'TBD'
	);
</script>

<div
	class={[
		'box grid min-w-0 grid-cols-1 gap-x-6 gap-y-4 p-4 pl-6 sm:gap-y-5 sm:p-6 sm:pl-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-start',
		EVENT_RAIL_CLASSES[event.color]
	]}
>
	<div class="row min-w-0 gap-sm">
		<span
			class={[
				'flex size-14 shrink-0 items-center justify-center rounded-lg text-3xl sm:size-16 sm:text-4xl',
				EVENT_COLOR_CLASSES[event.color]
			]}
			aria-hidden="true"
		>
			{@html event.iconSvg}
		</span>

		<div class="min-w-0">
			<h3 class="tx-header-3 text-xl font-semibold">{event.name}</h3>
			<p class={['tx-header-3 mt-0.5', EVENT_TEXT_COLOR_CLASSES[event.color]]}>{event.type}</p>
		</div>
	</div>

	{#if event.description}
		<p class="tx-base md:col-span-2">{event.description}</p>
	{/if}

	<div class="flex flex-col items-start gap-3 md:col-span-2 md:flex-row md:items-center md:gap-6">
		<div class="row shrink-0 gap-xs">
			<span class="icon-[material-symbols--calendar-today] size-4 shrink-0" aria-hidden="true"
			></span>
			<TimeDisplay
				date={event.date}
				format={event.status === 'Planned' ? 'monthName' : event.allDay ? 'date' : 'dateTime'}
				class="tx-base"
			/>
		</div>

		<div class="row min-w-0 gap-xs">
			<span class="icon-[material-symbols--location-on] size-4 shrink-0" aria-hidden="true"></span>
			<span class="tx-base min-w-0 break-words">{formattedPlace}</span>
		</div>
	</div>

	<LinkButton
		href={`/events/${event.id}`}
		variant="secondary"
		class="w-full md:col-start-2 md:row-start-1 md:w-auto md:justify-self-end"
	>
		View Details
	</LinkButton>
</div>
