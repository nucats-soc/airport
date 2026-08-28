<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import type { Event } from '$lib/types/event';
	import { formatDate, formatTime } from '$lib/util/dateTime';
	import { EVENT_COLOR_CLASSES } from '$lib/util/event';
	import Icon from '$lib/components/ui/Icon.svelte';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();
	let colorClasses = $derived(EVENT_COLOR_CLASSES[event.color]);
	let formattedDate = $derived(`${formatDate(event.date)} at ${formatTime(event.date)}`);
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
				<h1 class="tx-card-title">{event.name}</h1>
				<div class="mt-2 flex items-center gap-2">
					<Icon icon="icon-[material-symbols--calendar-today]" size="sm" />
					<time class="tx-body" datetime={event.date.toISOString()}>{formattedDate}</time>
				</div>
			</div>
		</div>
	</Inset>
</Box>
