<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { CalendarSelection } from '../types';
	import type { Event } from '$lib/types/event';
	import { formatDate, formatMonth } from '$lib/util/dateTime';
	import { nextCalendarSelection } from '../event-selection';

	interface Props {
		events: Event[];
		selection: CalendarSelection;
		onUpdateSelection: (selection: CalendarSelection) => void;
	}

	let { events, selection, onUpdateSelection }: Props = $props();

	const card = $derived.by(() => {
		const date = new Date(Date.UTC(selection.year, selection.month, selection.day ?? 1));
		const nextSelection = nextCalendarSelection(selection);
		const nextDate = new Date(Date.UTC(nextSelection.year, nextSelection.month, 1));
		const formattedSelection = selection.day ? formatDate(date) : formatMonth(date);

		return {
			nextSelection,
			icon:
				events.length === 0
					? 'icon-[material-symbols--event-busy-outline]'
					: 'icon-[material-symbols--calendar-today-outline]',
			title:
				events.length === 0
					? `There's nothing on during ${formattedSelection}`
					: `That's all for ${formattedSelection}`,
			action:
				selection.day === undefined
					? `Click to view ${formatMonth(nextDate)}.`
					: `Click to view all events in ${formatMonth(date)}.`,
			color: events.length === 0 ? 'text-red-300' : 'text-green-300'
		};
	});
</script>

<button
	type="button"
	class="mx-auto block w-fit max-w-full cursor-pointer rounded-[1.25rem] text-left"
	onclick={() => onUpdateSelection(card.nextSelection)}
>
	<Box extraClass="flex-1 transition-colors hover:bg-zinc-800/50">
		<Inset space="md">
			<Stack gap="sm" align="center" extraClass="text-center">
				<Icon icon={card.icon} size="lg" extraClass={card.color} />
				<div>
					<p class="tx-item-title">{card.title}</p>
					<p class="tx-body text-zinc-300">{card.action}</p>
				</div>
			</Stack>
		</Inset>
	</Box>
</button>
