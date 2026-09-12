<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { CalendarSelection } from '../types';
	import type { Event } from '$lib/types/event';
	import { formatDate, formatMonth } from '$lib/util/dateTime';
	import {
		isCalendarMonthBefore,
		isSelectionInPast,
		latestEventSelection,
		nextCalendarSelection,
		selectionToDate
	} from '../event-selection';

	interface Props {
		events: Event[];
		selection: CalendarSelection;
		onUpdateSelection: (selection: CalendarSelection) => void;
	}

	let { events, selection, onUpdateSelection }: Props = $props();

	const card = $derived.by(() => {
		const date = selectionToDate(selection);
		const nextSelection = nextCalendarSelection(selection);
		const nextDate = selectionToDate(nextSelection);
		const formattedSelection = selection.day ? formatDate(date) : formatMonth(date);
		const isPast = isSelectionInPast(selection);
		const canAdvance =
			selection.day !== undefined || isCalendarMonthBefore(selection, latestEventSelection());

		return {
			nextSelection,
			canAdvance,
			icon:
				events.length === 0
					? 'icon-[material-symbols--event-busy-outline]'
					: 'icon-[material-symbols--calendar-today-outline]',
			title:
				events.length === 0
					? isPast
						? `There was no events during ${formattedSelection}`
						: `No events during ${formattedSelection} right now`
					: `That's all for ${formattedSelection}`,
			action: !canAdvance
				? `You've reached the end of the current academic year.`
				: selection.day === undefined
					? `Click to view ${formatMonth(nextDate)}.`
					: `Click to view all events in ${formatMonth(date)}.`,
			color: events.length === 0 ? 'text-red-300' : 'text-green-300'
		};
	});
</script>

<button
	type="button"
	class={[
		'mx-auto block w-fit max-w-full rounded-[1.25rem] text-left',
		card.canAdvance ? 'cursor-pointer' : 'cursor-default'
	]}
	onclick={() => onUpdateSelection(card.nextSelection)}
	disabled={!card.canAdvance}
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
