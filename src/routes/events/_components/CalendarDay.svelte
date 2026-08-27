<script lang="ts">
	import type { Event } from '$lib/types/event';
	import { EVENT_COLOR_CLASSES } from '$lib/util/event';
	import classNames from 'classnames';
	import type { CalendarSelection } from '../types';

	interface Props {
		events: Event[];
		date: Date;
		selection: CalendarSelection;
		onUpdateSelection: (selection: CalendarSelection) => void;
	}

	let { events, date, selection, onUpdateSelection }: Props = $props();

	let firstEvent = $derived(events[0]);
	let isSelected = $derived(
		selection.day === date.getDate() &&
			selection.month === date.getMonth() &&
			selection.year === date.getFullYear()
	);
	let classes = $derived(
		classNames(
			'tx-button-label flex size-7 cursor-pointer touch-manipulation items-center justify-center rounded-full transition sm:size-8',
			firstEvent && (selection.day === undefined || isSelected)
				? EVENT_COLOR_CLASSES[firstEvent.color]
				: undefined,
			{
				'bg-zinc-100 text-black': isSelected && !firstEvent,
				'bg-zinc-700 text-zinc-200': selection.day !== undefined && !isSelected && firstEvent,
				'hover:bg-zinc-700': !firstEvent && !isSelected,
				'text-zinc-500':
					!firstEvent &&
					(date.getFullYear() !== selection.year || date.getMonth() !== selection.month)
			}
		)
	);

	function selectDate() {
		onUpdateSelection(
			isSelected
				? { year: selection.year, month: selection.month }
				: {
						year: date.getFullYear(),
						month: date.getMonth(),
						day: date.getDate()
					}
		);
	}
</script>

<button type="button" class={classes} aria-pressed={isSelected} onclick={selectDate}>
	{date.getDate()}
</button>
