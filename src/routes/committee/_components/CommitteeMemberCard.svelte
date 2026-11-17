<script lang="ts">
	import type { CommitteeMember } from '#lib/types/committeeMember.js';

	interface ProfileLink {
		label: string;
		href: string;
		icon: string;
	}

	interface Props {
		member: CommitteeMember;
	}

	let { member }: Props = $props();
	type PortraitState = 'loading' | 'loaded' | 'failed';
	let portraitState = $state<PortraitState>('loading');

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

{#snippet placeholder()}
	<span class="icon-[material-symbols--person] size-8 text-zinc-300" aria-hidden="true"></span>
{/snippet}

<article class="box flex flex-1 flex-col p-0">
	{#if member.imageUrl && portraitState !== 'failed'}
		<div class="relative aspect-4/3 w-full bg-zinc-700">
			{#if portraitState === 'loading'}
				<div class="absolute inset-0 flex items-center justify-center">
					{@render placeholder()}
				</div>
			{/if}
			<img
				src={member.imageUrl}
				alt={`A photo of ${member.name}, who is the ${member.position} for ${member.year}.`}
				class={[
					'absolute inset-0 size-full object-cover transition-opacity duration-150',
					portraitState === 'loaded' ? 'opacity-100' : 'opacity-0'
				]}
				width="400"
				height="300"
				loading="eager"
				decoding="async"
				onload={() => (portraitState = 'loaded')}
				onerror={() => (portraitState = 'failed')}
			/>
		</div>
	{:else}
		<div class="flex aspect-4/3 w-full items-center justify-center bg-zinc-700">
			{@render placeholder()}
		</div>
	{/if}

	<div class="flex min-w-0 flex-1 flex-col gap-sm p-sm">
		<div class="min-w-0">
			<h3 class="tx-header-3 truncate">{member.name}</h3>
			<p class="tx-base text-zinc-300">{member.position}</p>
		</div>

		{#if profileLinks.length > 0}
			<ul class="row mt-auto w-full gap-sm">
				{#each profileLinks as link}
					<li>
						<a
							href={link.href}
							class="flex text-zinc-300 hover:text-brand-light"
							target="_blank"
							rel="noopener noreferrer"
							aria-label={link.label}
						>
							<span class={[link.icon, 'size-4']} aria-hidden="true"></span>
						</a>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</article>
