<script lang="ts">
	import DropdownButton from '$lib/components/ui/DropdownButton.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { formatAcademicYear } from '$lib/util/academicYear';

	interface Props {
		years: number[];
		year: number;
		setYear: (year: number) => void;
	}

	let { years, year, setYear }: Props = $props();
	let orderedYears = $derived([...years].sort((a, b) => a - b));
	let yearIndex = $derived(orderedYears.indexOf(year));

	function moveYear(offset: number) {
		const nextYear = orderedYears[yearIndex + offset];
		if (nextYear !== undefined) setYear(nextYear);
	}
</script>

<DropdownButton type="secondary" label={formatAcademicYear(year)} align="right">
	<Cluster>
		<ActionButton
			type="icon"
			ariaLabel="Previous academic year"
			onClick={() => moveYear(-1)}
			isDisabled={yearIndex <= 0}
		>
			<Icon icon="icon-[material-symbols--chevron-left]" size="sm" />
		</ActionButton>
		<p class="tx-body">{formatAcademicYear(year)}</p>
		<ActionButton
			type="icon"
			ariaLabel="Next academic year"
			onClick={() => moveYear(1)}
			isDisabled={yearIndex < 0 || yearIndex >= orderedYears.length - 1}
		>
			<Icon icon="icon-[material-symbols--chevron-right]" size="sm" />
		</ActionButton>
	</Cluster>
</DropdownButton>
