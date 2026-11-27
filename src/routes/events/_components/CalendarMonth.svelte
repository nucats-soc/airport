<script lang="ts">
	import type { CalendarSelection } from '../types';
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import DropdownButton from '#lib/components/button/DropdownButton.svelte';
	import {
		EARLIEST_ACADEMIC_YEAR,
		academicYearMonths,
		academicYearOfMonth,
		academicYearSelection,
		availableAcademicYears,
		formatAcademicYear
	} from '#lib/util/academicYear.js';
	import { formatMonth, formatShortMonth } from '#lib/util/dateTime.js';
	import {
		EARLIEST_EVENT_SELECTION,
		isCalendarMonthAfter,
		isCalendarMonthBefore,
		isSameCalendarMonth,
		latestEventSelection,
		shiftCalendarMonth
	} from '../event-selection';

	interface Props {
		selection: CalendarSelection;
		onUpdateSelection: (selection: CalendarSelection) => void;
	}

	let { selection, onUpdateSelection }: Props = $props();

	let selectionLabel = $derived(formatMonth(new Date(Date.UTC(selection.year, selection.month))));
	let selectionAcademicYear = $derived(academicYearOfMonth(selection.year, selection.month));
	let academicMonths = $derived(
		academicYearMonths(selectionAcademicYear).map((candidate) => ({
			...candidate,
			label: formatShortMonth(new Date(Date.UTC(candidate.year, candidate.month))),
			key: `${candidate.year}-${candidate.month}`
		}))
	);
	let nextAcademicYearDisabled = $derived.by(() => {
		const academicYears = availableAcademicYears();
		return selectionAcademicYear >= academicYears[academicYears.length - 1];
	});

	function monthSelection(offset: number): CalendarSelection {
		return shiftCalendarMonth(selection, offset);
	}

	function isMonthDisabled(candidate: CalendarSelection): boolean {
		return (
			isCalendarMonthBefore(candidate, EARLIEST_EVENT_SELECTION) ||
			isCalendarMonthAfter(candidate, latestEventSelection())
		);
	}

	function moveMonth(offset: number) {
		onUpdateSelection(monthSelection(offset));
	}

	function moveAcademicYear(offset: number) {
		onUpdateSelection(academicYearSelection(selection, selectionAcademicYear + offset));
	}

	function selectMonth(candidate: CalendarSelection, close: () => void) {
		onUpdateSelection({ year: candidate.year, month: candidate.month });
		close();
	}
</script>

{#snippet arrow(label: string, direction: 'left' | 'right', disabled: boolean, onclick: () => void)}
	<ActionButton variant="secondary" shape="square" aria-label={label} {disabled} {onclick}>
		<span class={[`icon-[material-symbols--chevron-${direction}]`, 'size-4']} aria-hidden="true"
		></span>
	</ActionButton>
{/snippet}

<div class="flex items-center justify-between">
	{@render arrow(
		'Previous month',
		'left',
		isCalendarMonthBefore(monthSelection(-1), EARLIEST_EVENT_SELECTION),
		() => moveMonth(-1)
	)}
	<DropdownButton
		variant="ghost"
		noArrow
		class="min-w-0"
		aria-label={`Choose month and academic year, currently ${selectionLabel}`}
	>
		{#snippet buttonLabel()}
			{selectionLabel}
		{/snippet}

		{#snippet children(close)}
			<div class="w-72 sm:w-auto">
				<div class="row justify-between">
					{@render arrow(
						'Previous academic year',
						'left',
						selectionAcademicYear <= EARLIEST_ACADEMIC_YEAR,
						() => moveAcademicYear(-1)
					)}
					<p class="tx-header-3">{formatAcademicYear(selectionAcademicYear)}</p>
					{@render arrow('Next academic year', 'right', nextAcademicYearDisabled, () =>
						moveAcademicYear(1)
					)}
				</div>

				<div class="mt-3 grid grid-cols-3 gap-xs">
					{#each academicMonths as month (month.key)}
						{@const selected = isSameCalendarMonth(month, selection)}
						<button
							type="button"
							class={[
								'tx-base min-h-11 min-w-16 cursor-pointer rounded-lg px-3 py-2 leading-5 transition-colors sm:min-h-0',
								'disabled:cursor-not-allowed disabled:opacity-60',
								selected ? 'bg-zinc-600 text-white' : 'text-zinc-200 not-disabled:hover:bg-zinc-600'
							]}
							aria-pressed={selected}
							disabled={isMonthDisabled(month)}
							onclick={() => selectMonth(month, close)}
						>
							{month.label}
						</button>
					{/each}
				</div>
			</div>
		{/snippet}
	</DropdownButton>
	{@render arrow(
		'Next month',
		'right',
		isCalendarMonthAfter(monthSelection(1), latestEventSelection()),
		() => moveMonth(1)
	)}
</div>
