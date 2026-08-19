<script lang="ts">
	import type { Event } from '$lib/types/event';
	import { formatDate } from '$lib/util/dateTime';
	import { EVENT_COLOR_CLASSES } from '$lib/util/event';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();
	let colorClasses = $derived(EVENT_COLOR_CLASSES[event.color]);

	let formattedDate = $derived(formatDate(event.date, event.hasTime));
</script>

<div
	class={[
		'flex h-full w-full flex-col items-center justify-center rounded-[1.25rem] p-5 text-center',
		colorClasses
	]}
>
	<span class="mb-2 inline-flex text-4xl" aria-hidden="true">
		{@html event.iconSvg}
	</span>
	<h3 class="tx-item-title">{event.name}</h3>
	<time class="tx-body" datetime={event.date.toISOString()}>{formattedDate}</time>
</div>
