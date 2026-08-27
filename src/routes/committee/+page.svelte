<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import CommitteeMemberCard from './_components/CommitteeMemberCard.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let committeeSummary = $derived(
		data.committeeMembers.length === 0
			? 'Meet the team running NUCATS this year.'
			: data.committeeMembers.length === 1
				? 'Meet the committee member running NUCATS this year.'
				: `Meet the ${data.committeeMembers.length} committee members running NUCATS this year.`
	);
</script>

<section aria-labelledby="committee-title">
	<Container>
		<div class="flex flex-col gap-2">
			<h1 id="committee-title" class="tx-page-title">Committee</h1>
			<p class="tx-tagline">{committeeSummary}</p>
		</div>
	</Container>

	<Container>
		<Stack gap="sm">
			{#if data.committeeMembers.length === 0}
				<p class="tx-body text-zinc-300">Committee members will be listed here soon.</p>
			{:else}
				<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
					{#each data.committeeMembers as member}
						<CommitteeMemberCard {member} />
					{/each}
				</div>
			{/if}
		</Stack>
	</Container>
</section>
