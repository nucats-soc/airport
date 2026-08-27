<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SplitLayout from '$lib/components/layout/SplitLayout.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

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

<Container extraClass="py-8">
	<SplitLayout>
		{#snippet left()}
			<div class="flex flex-col">
				<h2 class="tx-section-title">Our Socials</h2>
				<p class="tx-body">
					Find us on these socials! We announce events on our social media channels, and we're even
					planning to host online events over on Discord!
				</p>
			</div>
		{/snippet}
		{#snippet right()}
			<Box background="card" extraClass="flex-1">
				<Inset space="lg">
					<div class="divide-y divide-zinc-700">
						{#each socials as social}
							<a
								href={social.href}
								target="noopener noreferrer"
								rel="_self"
								class="group flex items-center gap-4 py-6 transition-colors duration-200 first:pt-0 last:pb-0 hover:text-indigo-200"
							>
								<Cluster justify="between" extraClass="w-full">
									<Cluster>
										<Icon icon={social.icon} size="lg" />
										<div class="min-w-0 flex-1">
											<p class="tx-item-title">{social.name}</p>
											<p class="tx-body">{social.description}</p>
										</div>
									</Cluster>
									<Icon
										icon="icon-[material-symbols--arrow-forward]"
										extraClass="transition-transform not-motion-reduce:group-hover:translate-x-1"
									/>
								</Cluster>
							</a>
						{/each}
					</div>
				</Inset>
			</Box>
		{/snippet}
	</SplitLayout>
</Container>
