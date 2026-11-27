<script lang="ts">
	import { getHref, getLink, type LinkId } from '#lib/links.js';

	const socials: { id: LinkId; description: string }[] = [
		{ id: 'discord', description: 'Join our community' },
		{ id: 'github', description: 'Society projects & code' },
		{ id: 'instagram', description: 'Follow us' }
	];
</script>

<section class="page-container split-layout py-8">
	<div class="flex-col">
		<h2 class="tx-header-2">Our Socials</h2>
		<p class="tx-base">
			Find us on these socials! We announce events on our social media channels, and we're even
			planning to host online events over on Discord!
		</p>
	</div>
	<div>
		<ul class="box flex-1 divide-y divide-zinc-700 p-lg">
			{#each socials as social}
				{@const link = getLink(social.id)}
				<li class="py-6 first:pt-0 last:pb-0">
					<a
						href={getHref(social.id)}
						target="_blank"
						rel="noopener noreferrer"
						class="group row justify-between transition-colors duration-200 hover:text-brand-light"
					>
						<span class="row">
							{#if link.icon}
								<span class={[link.icon, 'size-8 shrink-0']} aria-hidden="true"></span>
							{/if}
							<span class="min-w-0 flex-1">
								<span class="tx-header-3 block">{link.label}</span>
								<span class="tx-base block">{social.description}</span>
							</span>
						</span>
						<span
							class="icon-[material-symbols--arrow-forward] size-6 shrink-0 transition-transform not-motion-reduce:group-hover:translate-x-1"
							aria-hidden="true"
						></span>
					</a>
				</li>
			{/each}
		</ul>
	</div>
</section>
