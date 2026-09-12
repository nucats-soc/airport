<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import CalendarDay from './CalendarDay.svelte';
	import CalendarMonth from './CalendarMonth.svelte';
	import type { Event } from '$lib/types/event';
	import type { CalendarSelection } from '../types';
	import { isSameDay } from '../event-selection';

	interface Props {
		events: Event[];
		selection: CalendarSelection;
		onUpdateSelection: (selection: CalendarSelection) => void;
	}

	let { events, selection, onUpdateSelection }: Props = $props();

	const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

	function calendarDates({ year, month }: CalendarSelection): Date[] {
		const firstDay = new Date(year, month, 1);
		const offset = (firstDay.getDay() + 6) % 7;
		const start = new Date(year, month, 1 - offset);

		return Array.from({ length: 42 }, (_, index) => {
			const date = new Date(start);
			date.setDate(start.getDate() + index);
			return date;
		});
	}

	let days = $derived(
		calendarDates(selection).map((date) => ({
			date,
			events: events.filter((event) => isSameDay(event.date, date))
		}))
	);
</script>

<Box background="card" allowOverflow>
	<Inset>
		<Stack gap="sm">
			<CalendarMonth {selection} {onUpdateSelection} />
			<div class="grid grid-cols-7 place-items-center">
				{#each weekdays as weekday}
					<p class="tx-button-label text-xs text-zinc-400 sm:text-base">{weekday}</p>
				{/each}
				{#each days as day}
					<CalendarDay date={day.date} events={day.events} {selection} {onUpdateSelection} />
				{/each}
			</div>
		</Stack>
	</Inset>
</Box>
