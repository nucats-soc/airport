<script lang="ts">
	import type { Event } from '$lib/types/event';
	import Pill from '$lib/components/ui/Pill.svelte';
	import { EVENT_COLOR_CLASSES } from '$lib/util/event';
	import { formatDuration } from '$lib/util/dateTime';

	interface Props {
		event: Event;
	}

	interface InformationPill {
		icon: string;
		name: string;
		value: string;
		color: string;
	}

	function getInformationPills(event: Event): InformationPill[] {
		let attributes: InformationPill[] = [];
		attributes.push({
			name: 'Event Type',
			icon: 'icon-[material-symbols--category-outline]',
			color: EVENT_COLOR_CLASSES[event.color],
			value: event.type
		});
		if (event.durationMinutes) {
			attributes.push({
				name: 'Duration',
				icon: 'icon-[material-symbols--schedule-outline]',
				color: 'bg-zinc-700',
				value: formatDuration(event.durationMinutes)
			});
		}
		return attributes;
	}

	let { event }: Props = $props();
	let informationPills: InformationPill[] = $derived(getInformationPills(event));
</script>

<dl class="tx-body flex flex-wrap gap-2">
	{#each informationPills as informationPill}
		<Pill icon={informationPill.icon} extraClass={informationPill.color}>
			<dt class="sr-only">{informationPill.name}</dt>
			<dd>{informationPill.value}</dd>
		</Pill>
	{/each}
</dl>
