<script lang="ts">
	import TimeDisplay from '#lib/components/TimeDisplay.svelte';
	import type { Event } from '#lib/types/event.js';
	import { EVENT_COLOR_CLASSES, EVENT_RAIL_CLASSES } from '#lib/util/event.js';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();
</script>

<div class={['box row min-w-0 gap-sm pl-8', EVENT_RAIL_CLASSES[event.color]]}>
	<span
		class={[
			'flex size-16 shrink-0 items-center justify-center rounded-lg text-4xl',
			EVENT_COLOR_CLASSES[event.color]
		]}
		aria-hidden="true"
	>
		{@html event.iconSvg}
	</span>

	<div class="min-w-0">
		<h1 class="tx-header-3 text-xl font-semibold">{event.name}</h1>
		<div class="row mt-2 gap-xs">
			<span class="icon-[material-symbols--calendar-today] size-4 shrink-0" aria-hidden="true"
			></span>
			<TimeDisplay
				date={event.date}
				format={event.status === 'Planned' ? 'monthName' : event.allDay ? 'date' : 'dateTime'}
				class="tx-base"
			/>
		</div>
	</div>
</div>
