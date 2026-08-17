<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SplitLayout from '$lib/components/layout/SplitLayout.svelte';
	import Card from '$lib/components/card/Card.svelte';

	interface Social {
		name: string;
		description: string;
		icon: string;
		href: string;
	}

	const socials: Social[] = [
		{
			name: 'Discord',
			description: 'Join our community',
			icon: 'icon-[simple-icons--discord]',
			href: 'https://discord.gg/N4dJQdafrd'
		},
		{
			name: 'GitHub',
			description: 'Society projects & code',
			icon: 'icon-[simple-icons--github]',
			href: 'https://github.com/NUCats-soc'
		},
		{
			name: 'Instagram',
			description: 'Follow us',
			icon: 'icon-[simple-icons--instagram]',
			href: 'https://instagram.com/nucats_'
		}
	];
</script>

<Container>
	<SplitLayout>
		{#snippet left()}
			<div class="flex flex-col justify-center">
				<h2 class="tx-section-title">Our Socials</h2>
				<p class="tx-body">
					We are active on various platforms. Join our community, check out our projects, and stay
					up to date with the latest events.
				</p>
			</div>
		{/snippet}
		{#snippet right()}
			<Card padding="lg">
				<div class="divide-y divide-zinc-700">
					{#each socials as social}
						<a
							href={social.href}
							target="noopener noreferrer"
							rel="_self"
							class="group flex items-center gap-4 py-6 transition-colors duration-200 first:pt-0 last:pb-0 hover:text-indigo-200"
						>
							<span class={[social.icon, 'size-8 shrink-0']} aria-hidden="true"></span>

							<div class="flex min-w-0 flex-1 items-center gap-4">
								<div class="min-w-0 flex-1">
									<p class="tx-item-title">{social.name}</p>
									<p class="tx-body">{social.description}</p>
								</div>

								<span
									class="icon-[material-symbols--arrow-forward] size-6 shrink-0 transition-transform not-motion-reduce:group-hover:translate-x-1"
									aria-hidden="true"
								></span>
							</div>
						</a>
					{/each}
				</div>
			</Card>
		{/snippet}
	</SplitLayout>
</Container>
