<script lang="ts">
	import PageHeader from '#lib/components/PageHeader.svelte';
	import PageMetadata from '#lib/components/PageMetadata.svelte';
	import Spinner from '#lib/components/Spinner.svelte';
	import headerImage from '#lib/assets/headers/committee.jpg?enhanced';
	import { formatAcademicYear, getAcademicYear } from '#lib/util/academicYear.js';
	import CommitteeMembers from './_components/CommitteeMembers.svelte';

	const currentYear = getAcademicYear();
	let year = $state(currentYear);

	let summary = $derived(
		year === currentYear
			? 'Meet the team running NUCATS this year.'
			: `Meet the team who ran NUCATS during the ${formatAcademicYear(year)} academic year.`
	);
</script>

<PageMetadata title="Committee" description={summary} />

<section class="page-container flex flex-col gap-md" aria-label="Committee">
	<PageHeader image={headerImage} title="Committee" description={summary} />

	<svelte:boundary>
		<CommitteeMembers bind:year={year}/>

		{#snippet pending()}
			<Spinner label="Loading committee members" class="w-full py-8" />
		{/snippet}

		{#snippet failed()}
			<p class="tx-base py-8">Committee members could not be loaded.</p>
		{/snippet}
	</svelte:boundary>
</section>
