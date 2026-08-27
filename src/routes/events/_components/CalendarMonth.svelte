<script lang="ts">
	import type { CalendarSelection } from '../types';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import DropdownButton from '$lib/components/ui/DropdownButton.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	interface Props {
		selection: CalendarSelection;
		onUpdateSelection: (selection: CalendarSelection) => void;
	}

	let { selection, onUpdateSelection }: Props = $props();

	const monthFormatter = new Intl.DateTimeFormat('en-GB', { month: 'long', year: 'numeric' });
	const months = Array.from({ length: 12 }, (_, month) => ({
		month,
		label: new Intl.DateTimeFormat('en-GB', { month: 'short' }).format(new Date(2020, month))
	}));
	let selectionLabel = $derived(monthFormatter.format(new Date(selection.year, selection.month)));

	function moveMonth(offset: number) {
		const date = new Date(selection.year, selection.month + offset, 1);
		onUpdateSelection({ year: date.getFullYear(), month: date.getMonth() });
	}

	function moveYear(offset: number) {
		onUpdateSelection({ year: selection.year + offset, month: selection.month });
	}

	function selectMonth(month: number, close: () => void) {
		onUpdateSelection({ year: selection.year, month });
		close();
	}
</script>

<Cluster gap="none" justify="between">
	<ActionButton type="icon" ariaLabel="Previous month" onClick={() => moveMonth(-1)}>
		<Icon icon="icon-[material-symbols--chevron-left]" size="sm" />
	</ActionButton>
	<DropdownButton
		type="subtle"
		label={selectionLabel}
		extraClass="min-w-0"
		ariaLabel={`Choose month and year, currently ${selectionLabel}`}
		showArrow={false}
	>
		{#snippet children(close)}
			<div class="w-72 sm:w-auto">
				<Cluster justify="between">
					<ActionButton type="icon" ariaLabel="Previous year" onClick={() => moveYear(-1)}>
						<Icon icon="icon-[material-symbols--chevron-left]" size="sm" />
					</ActionButton>
					<p class="tx-item-title">{selection.year}</p>
					<ActionButton type="icon" ariaLabel="Next year" onClick={() => moveYear(1)}>
						<Icon icon="icon-[material-symbols--chevron-right]" size="sm" />
					</ActionButton>
				</Cluster>

				<div class="mt-3 grid grid-cols-3 gap-2">
					{#each months as month}
						<ActionButton
							type="compact"
							isSelected={month.month === selection.month}
							extraClass="min-h-11 sm:min-h-0"
							onClick={() => selectMonth(month.month, close)}
						>
							{month.label}
						</ActionButton>
					{/each}
				</div>
			</div>
		{/snippet}
	</DropdownButton>
	<ActionButton type="icon" ariaLabel="Next month" onClick={() => moveMonth(1)}>
		<Icon icon="icon-[material-symbols--chevron-right]" size="sm" />
	</ActionButton>
</Cluster>
