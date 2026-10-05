<script lang="ts">
	import Container from '#lib/components/layout/Container.svelte';
	import SplitLayout from '#lib/components/layout/SplitLayout.svelte';
	import Box from '#lib/components/layout/Box.svelte';
	import Inset from '#lib/components/layout/Inset.svelte';
	import Stack from '#lib/components/layout/Stack.svelte';
	import Cluster from '#lib/components/layout/Cluster.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';

	import { getHref, getLink, type LinkId } from '#lib/links.js';

	const socials: { id: LinkId; description: string }[] = [
		{ id: 'discord', description: 'Join our community' },
		{ id: 'github', description: 'Society projects & code' },
		{ id: 'instagram', description: 'Follow us' }
	];
</script>

<Container extraClass="py-8">
	<SplitLayout>
		{#snippet left()}
			<div class="flex flex-col">
				<h2 class="tx-header-2">Our Socials</h2>
				<p class="tx-base">
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
							{@const link = getLink(social.id)}
							<a
								href={getHref(social.id)}
								target="_blank"
								rel="noopener noreferrer"
								class="group flex items-center gap-4 py-6 transition-colors duration-200 first:pt-0 last:pb-0 hover:text-brand-light"
							>
								<Cluster justify="between" extraClass="w-full">
									<Cluster>
										{#if link.icon}
											<Icon icon={link.icon} size="lg" />
										{/if}
										<div class="min-w-0 flex-1">
											<p class="tx-header-3">{link.label}</p>
											<p class="tx-base">{social.description}</p>
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
