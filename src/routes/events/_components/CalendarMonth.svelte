<script lang="ts">
	import type { CalendarSelection } from '../types';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import DropdownButton from '$lib/components/ui/DropdownButton.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import {
		EARLIEST_ACADEMIC_YEAR,
		academicYearMonths,
		academicYearOfMonth,
		academicYearSelection,
		availableAcademicYears,
		formatAcademicYear
	} from '$lib/util/academicYear';
	import { formatMonth, formatShortMonth } from '$lib/util/dateTime';
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

<Cluster gap="none" justify="between">
	<ActionButton
		type="icon"
		ariaLabel="Previous month"
		onClick={() => moveMonth(-1)}
		isDisabled={isCalendarMonthBefore(monthSelection(-1), EARLIEST_EVENT_SELECTION)}
	>
		<Icon icon="icon-[material-symbols--chevron-left]" size="sm" />
	</ActionButton>
	<DropdownButton
		type="subtle"
		label={selectionLabel}
		extraClass="min-w-0"
		ariaLabel={`Choose month and academic year, currently ${selectionLabel}`}
		showArrow={false}
	>
		{#snippet children(close)}
			<div class="w-72 sm:w-auto">
				<Cluster justify="between">
					<ActionButton
						type="icon"
						ariaLabel="Previous academic year"
						onClick={() => moveAcademicYear(-1)}
						isDisabled={selectionAcademicYear <= EARLIEST_ACADEMIC_YEAR}
					>
						<Icon icon="icon-[material-symbols--chevron-left]" size="sm" />
					</ActionButton>
					<p class="tx-item-title">{formatAcademicYear(selectionAcademicYear)}</p>
					<ActionButton
						type="icon"
						ariaLabel="Next academic year"
						onClick={() => moveAcademicYear(1)}
						isDisabled={nextAcademicYearDisabled}
					>
						<Icon icon="icon-[material-symbols--chevron-right]" size="sm" />
					</ActionButton>
				</Cluster>

				<div class="mt-3 grid grid-cols-3 gap-2">
					{#each academicMonths as month (month.key)}
						<ActionButton
							type="compact"
							isSelected={isSameCalendarMonth(month, selection)}
							isDisabled={isMonthDisabled(month)}
							extraClass="min-h-11 sm:min-h-0"
							onClick={() => selectMonth(month, close)}
						>
							{month.label}
						</ActionButton>
					{/each}
				</div>
			</div>
		{/snippet}
	</DropdownButton>
	<ActionButton
		type="icon"
		ariaLabel="Next month"
		onClick={() => moveMonth(1)}
		isDisabled={isCalendarMonthAfter(monthSelection(1), latestEventSelection())}
	>
		<Icon icon="icon-[material-symbols--chevron-right]" size="sm" />
	</ActionButton>
</Cluster>
