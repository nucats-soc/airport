<script lang="ts">
	import { getAllCommitteeMembers, getCommitteeYears } from '../committee.remote';
	import CommitteeMemberCard from './CommitteeMemberCard.svelte';
	import CommitteeYearSelector from './CommitteeYearSelector.svelte';

	interface Props {
		year: number;
	}

	let { year = $bindable() }: Props = $props();

	const [years, allMembers] = await Promise.all([getCommitteeYears(), getAllCommitteeMembers()]);

	// Fall back to the most recent committee if the requested year has none.
	if (years.length > 0 && !years.includes(year)) {
		year = years[0];
	}

	let members = $derived(allMembers.filter((member) => member.year === year));
</script>

<div class="flex justify-end">
	<CommitteeYearSelector {years} bind:year />
</div>

{#if members.length === 0}
	<p class="tx-base text-zinc-300">Committee members will be listed here soon.</p>
{:else}
	<ul class="grid gap-sm sm:grid-cols-2 lg:grid-cols-4">
		{#each members as member (member.id)}
			<li class="flex">
				<CommitteeMemberCard {member} />
			</li>
		{/each}
	</ul>
{/if}
