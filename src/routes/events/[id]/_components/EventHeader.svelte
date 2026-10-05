<script lang="ts">
	import Box from '#lib/components/layout/Box.svelte';
	import Inset from '#lib/components/layout/Inset.svelte';
	import TimeDisplay from '#lib/components/TimeDisplay.svelte';
	import type { Event } from '#lib/types/event.js';
	import { EVENT_COLOR_CLASSES } from '#lib/util/event.js';
	import Icon from '#lib/components/ui/Icon.svelte';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();
	let colorClasses = $derived(EVENT_COLOR_CLASSES[event.color]);
</script>

<Box background="card" extraClass="flex min-w-0 flex-1 flex-row">
	<div class={['w-2 shrink-0 self-stretch', colorClasses]} aria-hidden="true"></div>
	<Inset space="md" extraClass="min-w-0 flex-1">
		<div class="flex items-center gap-4">
			<div class={['flex size-16 shrink-0 items-center justify-center rounded-lg', colorClasses]}>
				<span class="inline-flex text-4xl" aria-hidden="true">
					{@html event.iconSvg}
				</span>
			</div>

			<div class="min-w-0">
				<h1 class="tx-header-3 text-xl font-semibold">{event.name}</h1>
				<div class="mt-2 flex items-center gap-2">
					<Icon icon="icon-[material-symbols--calendar-today]" size="sm" />
					<TimeDisplay
						date={event.date}
						format={event.status === 'Planned' ? 'monthName' : event.allDay ? 'date' : 'dateTime'}
						extraClass="tx-base"
					/>
				</div>
			</div>
		</div>
	</Inset>
</Box>
