<script lang="ts">
	import type { CalendarSelection } from '../types';
	import type { Event } from '#lib/types/event.js';
	import { formatDate, formatMonth } from '#lib/util/dateTime.js';
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
		'mx-auto flex w-fit max-w-full flex-col items-center gap-sm rounded-2xl p-md text-center transition-colors',
		card.canAdvance ? 'cursor-pointer hover:bg-zinc-800/50' : 'cursor-default'
	]}
	onclick={() => onUpdateSelection(card.nextSelection)}
	disabled={!card.canAdvance}
>
	<span class={[card.icon, card.color, 'size-8 shrink-0']} aria-hidden="true"></span>
	<span>
		<span class="tx-header-3 block">{card.title}</span>
		<span class="tx-base block text-zinc-300">{card.action}</span>
	</span>
</button>
