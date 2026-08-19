<script lang="ts">
	import AnimatedCatBackground from '$lib/components/background/AnimatedCatBackground.svelte';
	import Container from '$lib/components/layout/Container.svelte';
	import CommitteeMemberCard from './_components/CommitteeMemberCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let committeeSummary = $derived(
		data.committeeMembers.length === 0
			? `Meet the team running NUCATS in ${data.selectedYear}.`
			: data.committeeMembers.length === 1
				? `Meet the committee member running NUCATS in ${data.selectedYear}.`
				: `Meet the ${data.committeeMembers.length} committee members running NUCATS in ${data.selectedYear}.`
	);
</script>

<section aria-labelledby="committee-title">
	<AnimatedCatBackground>
		<Container>
			<div class="flex flex-col gap-2 py-4 lg:py-8">
				<h1 id="committee-title" class="tx-page-title">Committee</h1>
				<p class="tx-tagline">{committeeSummary}</p>
			</div>
		</Container>
	</AnimatedCatBackground>

	<Container>
		<div class="flex flex-col gap-6 py-4 lg:py-8">
			{#if data.committeeMembers.length === 0}
				<p class="tx-body text-zinc-300">
					No committee members found for {data.selectedYear}. Try another year with
					<code>?year=YYYY</code>.
				</p>
			{:else}
				<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{#each data.committeeMembers as member}
						<CommitteeMemberCard {member} />
					{/each}
				</div>
			{/if}
		</div>
	</Container>
</section>
