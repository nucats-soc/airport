<script lang="ts">
	import { browser } from '$app/environment';
	import Container from '$lib/components/layout/Container.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Loadable from '$lib/components/ui/Loadable.svelte';
	import CommitteeMemberCard from './_components/CommitteeMemberCard.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import headerImage from '$lib/assets/headers/committee.jpg?enhanced';
	import { formatAcademicYear, getAcademicYear } from '$lib/util/academicYear';
	import { getAllCommitteeMembers, getCommitteeYears } from './committee.remote';
	import CommitteeYearSelector from './_components/CommitteeYearSelector.svelte';
	import PageMetadata from '$lib/components/PageMetadata.svelte';
	import { debounced } from '$lib/util/debounced.svelte';

	const initialYear = getAcademicYear();
	let year = $state<number>(initialYear);
	const requestedYear = debounced(() => year, 1000);

	let yearsQuery = $derived(browser ? getCommitteeYears() : undefined);
	let committeeYears = $derived(yearsQuery?.current ?? []);
	let allMembersQuery = $derived(browser ? getAllCommitteeMembers() : undefined);
	let members = $derived(
		(allMembersQuery?.current ?? []).filter((member) => member.year === requestedYear())
	);
	let queryState = $derived.by(() => {
		if (
			!yearsQuery ||
			yearsQuery.loading ||
			!allMembersQuery ||
			allMembersQuery.loading ||
			requestedYear() !== year
		) {
			return { loading: true };
		}

		return { loading: false, error: yearsQuery.error ?? allMembersQuery.error };
	});

	let summary = $derived(
		year === initialYear
			? 'Meet the team running NUCATS this year.'
			: `Meet the team who ran NUCATS during the ${formatAcademicYear(year)} academic year.`
	);

	$effect(() => {
		if (committeeYears.length > 0 && !committeeYears.includes(year)) {
			year = committeeYears[0];
		}
	});
</script>

<PageMetadata title="Committee" description={summary} />

<section aria-labelledby="committee-title">
	<Container>
		<PageHeader image={headerImage} title="Committee" description={summary} />
	</Container>
	<Container extraClass="py-4">
		<Stack>
			<div class="flex justify-end">
				<CommitteeYearSelector
					years={committeeYears}
					{year}
					setYear={(newYear) => (year = newYear)}
				/>
			</div>
			<Loadable
				state={queryState}
				loadingLabel="Loading committee members"
				errorMessage="Committee members could not be loaded."
				extraClass="w-full py-8"
			>
				<Stack gap="sm">
					{#if members.length === 0}
						<p class="tx-body text-zinc-300">Committee members will be listed here soon.</p>
					{:else}
						<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
							{#each members as member (member.id)}
								<CommitteeMemberCard {member} />
							{/each}
						</div>
					{/if}
				</Stack>
			</Loadable>
		</Stack>
	</Container>
</section>
