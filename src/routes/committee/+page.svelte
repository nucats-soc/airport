<script lang="ts">
	import { browser } from '$app/environment';
	import Container from '$lib/components/layout/Container.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Loadable from '$lib/components/ui/Loadable.svelte';
	import CommitteeMemberCard from './_components/CommitteeMemberCard.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import headerImage from '$lib/assets/headers/committee.jpg';
	import { getCommitteeMembers } from './committee.remote';

	let committeeQuery = $derived(browser ? getCommitteeMembers() : undefined);
	let committeeMembers = $derived(committeeQuery?.current ?? []);
	let committeeSummary = $derived(
		committeeMembers.length === 0
			? 'Meet the team running NUCATS this year.'
			: committeeMembers.length === 1
				? 'Meet the committee member running NUCATS this year.'
				: `Meet the ${committeeMembers.length} committee members running NUCATS this year.`
	);
</script>

<section aria-labelledby="committee-title">
	<Container>
		<PageHeader image={headerImage} title="Committee" description={committeeSummary} />
	</Container>
	<Container extraClass="py-8">
		<Loadable
			state={committeeQuery}
			loadingLabel="Loading committee members"
			errorMessage="Committee members could not be loaded."
			extraClass="w-full py-8"
		>
			<Stack gap="sm">
				{#if committeeMembers.length === 0}
					<p class="tx-body text-zinc-300">Committee members will be listed here soon.</p>
				{:else}
					<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{#each committeeMembers as member (member.id)}
							<CommitteeMemberCard {member} />
						{/each}
					</div>
				{/if}
			</Stack>
		</Loadable>
	</Container>
</section>
