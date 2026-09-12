<script lang="ts">
	import type { Event } from '$lib/types/event';
	import { EVENT_COLOR_CLASSES } from '$lib/util/event';
	import classNames from 'classnames';
	import type { CalendarSelection } from '../types';
	import {
		EARLIEST_EVENT_SELECTION,
		dateToSelection,
		isCalendarMonthAfter,
		isCalendarMonthBefore,
		isDateSelected,
		isSameCalendarMonth,
		latestEventSelection
	} from '../event-selection';

	interface Props {
		events: Event[];
		date: Date;
		selection: CalendarSelection;
		onUpdateSelection: (selection: CalendarSelection) => void;
	}

	let { events, date, selection, onUpdateSelection }: Props = $props();

	let dateSelection = $derived(dateToSelection(date));
	let isDisabled = $derived(
		isCalendarMonthBefore(dateSelection, EARLIEST_EVENT_SELECTION) ||
			isCalendarMonthAfter(dateSelection, latestEventSelection())
	);
	let firstEvent = $derived(events[0]);
	let isSelected = $derived(isDateSelected(selection, date));
	let classes = $derived(
		classNames(
			'tx-button-label flex size-7 touch-manipulation items-center justify-center rounded-full transition sm:size-8',
			firstEvent && !isDisabled && (selection.day === undefined || isSelected)
				? EVENT_COLOR_CLASSES[firstEvent.color]
				: undefined,
			{
				'cursor-pointer': !isDisabled,
				'cursor-not-allowed text-zinc-600': isDisabled,
				'bg-zinc-100 text-black': isSelected && !firstEvent,
				'bg-zinc-700 text-zinc-200': selection.day !== undefined && !isSelected && firstEvent,
				'hover:bg-zinc-700': !firstEvent && !isSelected,
				'text-zinc-500': !firstEvent && !isSameCalendarMonth(dateSelection, selection)
			}
		)
	);

	function selectDate() {
		if (isDisabled) return;

		onUpdateSelection(
			isSelected ? { year: selection.year, month: selection.month } : dateToSelection(date)
		);
	}
</script>

<button
	type="button"
	class={classes}
	aria-pressed={isSelected}
	onclick={selectDate}
	disabled={isDisabled}
>
	{date.getDate()}
</button>
