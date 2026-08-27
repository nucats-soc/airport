<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import type { CommitteeMember } from '$lib/types/committeeMember';
	import Icon from '$lib/components/ui/Icon.svelte';

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
		// noinspection HttpUrlsUsage
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

<Box background="card" extraClass="flex h-full flex-1 flex-col">
	{#if member.imageUrl}
		<img
			src={member.imageUrl}
			alt={`A photo of ${member.name}, who is the ${member.position} for ${member.year}.`}
			class="aspect-4/3 w-full object-cover"
			loading="lazy"
		/>
	{:else}
		<div class="flex aspect-4/3 w-full items-center justify-center bg-zinc-700">
			<Icon icon="icon-[material-symbols--person]" size="lg" extraClass="text-zinc-300" />
		</div>
	{/if}

	<Inset space="sm" extraClass="flex flex-1 min-w-0">
		<Stack gap="sm" extraClass="min-w-0 flex-1">
			<div class="min-w-0">
				<p class="tx-item-title truncate">{member.name}</p>
				<p class="tx-body text-zinc-300">{member.position}</p>
			</div>

			{#if profileLinks.length > 0}
				<Cluster gap="sm" extraClass="mt-auto w-full">
					{#each profileLinks as link}
						<a
							href={link.href}
							class="flex items-center gap-1 text-xl text-zinc-300 hover:text-indigo-300"
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.label}
						>
							<Icon icon={link.icon} size="sm" />
						</a>
					{/each}
				</Cluster>
			{/if}
		</Stack>
	</Inset>
</Box>
