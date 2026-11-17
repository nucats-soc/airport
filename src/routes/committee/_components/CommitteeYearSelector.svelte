<script lang="ts">
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import DropdownButton from '#lib/components/button/DropdownButton.svelte';
	import { formatAcademicYear } from '#lib/util/academicYear.js';

	interface Props {
		years: number[];
		year: number;
	}

	let { years, year = $bindable() }: Props = $props();

	let orderedYears = $derived(years.toSorted((a, b) => a - b));
	let yearIndex = $derived(orderedYears.indexOf(year));

	function moveYear(offset: number) {
		year = orderedYears[yearIndex + offset] ?? year;
	}
</script>

<DropdownButton type="secondary" align="end" aria-label="Choose committee year">
	{#snippet buttonLabel()}
		{formatAcademicYear(year)}
	{/snippet}

	<div class="row">
		<ActionButton
			type="secondary"
			shape="square"
			aria-label="Previous academic year"
			disabled={yearIndex <= 0}
			onclick={() => moveYear(-1)}
		>
			<span class="icon-[material-symbols--chevron-left] size-4" aria-hidden="true"></span>
		</ActionButton>
		<p class="tx-base">{formatAcademicYear(year)}</p>
		<ActionButton
			type="secondary"
			shape="square"
			aria-label="Next academic year"
			disabled={yearIndex < 0 || yearIndex >= orderedYears.length - 1}
			onclick={() => moveYear(1)}
		>
			<span class="icon-[material-symbols--chevron-right] size-4" aria-hidden="true"></span>
		</ActionButton>
	</div>
</DropdownButton>
