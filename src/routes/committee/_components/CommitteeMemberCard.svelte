<script lang="ts">
	import LinkButton from '$lib/components/button/LinkButton.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import type { CommitteeMember } from '$lib/types/committeeMember';

	interface ProfileLink {
		label: string;
		href: string;
		icon: string;
	}

	interface Props {
		member: CommitteeMember;
	}

	let { member }: Props = $props();

	function asLink(value: string, baseUrl: string): string {
		if (
			value.startsWith('http://') ||
			value.startsWith('https://') ||
			value.startsWith('mailto:')
		) {
			return value;
		}

		return `${baseUrl}${value.replace(/^@/, '')}`;
	}

	function profileLinksOf(member: CommitteeMember): ProfileLink[] {
		const profileLinks: ProfileLink[] = [];

		if (member.email) {
			profileLinks.push({
				label: 'Email',
				href: `mailto:${member.email}`,
				icon: 'icon-[material-symbols--mail-outline]'
			});
		}

		if (member.website) {
			profileLinks.push({
				label: 'Website',
				href: asLink(member.website, 'https://'),
				icon: 'icon-[material-symbols--language]'
			});
		}

		if (member.instagram) {
			profileLinks.push({
				label: 'Instagram',
				href: asLink(member.instagram, 'https://instagram.com/'),
				icon: 'icon-[simple-icons--instagram]'
			});
		}

		if (member.linkedIn) {
			profileLinks.push({
				label: 'LinkedIn',
				href: asLink(member.linkedIn, 'https://linkedin.com/in/'),
				icon: 'icon-[simple-icons--linkedin]'
			});
		}

		if (member.github) {
			profileLinks.push({
				label: 'GitHub',
				href: asLink(member.github, 'https://github.com/'),
				icon: 'icon-[simple-icons--github]'
			});
		}

		return profileLinks;
	}

	let profileLinks = $derived(profileLinksOf(member));
</script>

<Card padding="sm" extraClass="h-full">
	{#snippet thumbnail()}
		{#if member.imageUrl}
			<img
				src={member.imageUrl}
				alt={`A photo of ${member.name}, who is the ${member.position} for ${member.year}.`}
				class="aspect-[4/3] w-full object-cover"
				loading="lazy"
			/>
		{:else}
			<div class="flex aspect-[4/3] w-full items-center justify-center bg-zinc-700">
				<span class="icon-[material-symbols--person] size-14 text-zinc-300"></span>
			</div>
		{/if}
	{/snippet}

	<div class="min-w-0">
		<p class="tx-item-title truncate">{member.name}</p>
		<p class="tx-body text-zinc-300">{member.position}</p>
	</div>

	{#snippet footer()}
		{#if profileLinks.length > 0}
			<div class="flex w-full flex-wrap items-center gap-2">
				{#each profileLinks as link}
					<a href={link.href} class="flex items-center gap-1 text-zinc-300 hover:text-zinc-100 text-xl" target="_blank" rel="noopener noreferrer" aria-label={link.label}>
						<span class={link.icon}></span>
					</a>
				{/each}
			</div>
		{/if}
	{/snippet}
</Card>
