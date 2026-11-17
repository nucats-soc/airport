<script lang="ts">
	import ExternalArrow from '#lib/components/icon/ExternalArrow.svelte';
	import { footerLinkIds, getHref, getLinks, type LinkId } from '#lib/links.js';
</script>

{#snippet linkList(ids: readonly LinkId[])}
	<ul class="flex flex-col gap-3">
		{#each getLinks(...ids) as link}
			{@const newTab = link.openInNewTab ?? link.external}
			<li>
				<a
					href={link.href}
					target={newTab ? '_blank' : undefined}
					rel={newTab ? 'noopener noreferrer' : undefined}
					class="inline-flex items-center gap-xs text-zinc-300 transition-colors hover:text-brand-light"
				>
					{#if link.icon}
						<span class={[link.icon, 'size-4 shrink-0']} aria-hidden="true"></span>
					{/if}
					{link.label}
					{#if link.external}
						<ExternalArrow />
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

{#snippet credit(id: LinkId, label: string)}
	<a href={getHref(id)} class="text-brand-light hover:underline">{label}</a>
{/snippet}

<footer class="mt-20 w-full bg-zinc-950 py-10">
	<div class="page-container flex flex-col gap-md">
		<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
			<div>
				<a href={getHref('home')} class="row w-fit shrink-0 gap-sm" aria-label="NUCATS home">
					<img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50" />
					<span class="text-2xl leading-none font-extrabold tracking-normal text-white">NUCATS</span
					>
				</a>
				<p class="tx-base mt-3 max-w-sm text-zinc-400">
					Newcastle University Computing and Technology Society
				</p>
			</div>

			<nav aria-labelledby="footer-pages-heading">
				<h2 id="footer-pages-heading" class="tx-header-3 mb-sm">Pages</h2>
				{@render linkList(footerLinkIds.pages)}
			</nav>

			<nav aria-labelledby="footer-socials-heading">
				<h2 id="footer-socials-heading" class="tx-header-3 mb-sm">Find NUCATS</h2>
				{@render linkList(footerLinkIds.socials)}
			</nav>

			<nav aria-labelledby="footer-union-heading">
				<h2 id="footer-union-heading" class="tx-header-3 mb-sm">Students' Union</h2>
				{@render linkList(footerLinkIds.studentsUnion)}
			</nav>
		</div>
		<div class="row gap-xs">
			<span
				class="icon-[material-symbols--design-services] size-4 shrink-0 text-brand-light"
				aria-hidden="true"
			></span>
			<p class="tx-base text-zinc-400">
				Crafted in the North East by {@render credit('jack', 'Jack')} and {@render credit(
					'tyler',
					'Tyler'
				)}. AGPL licensed source code available on {@render credit('source-code', 'GitHub')}.
			</p>
		</div>
	</div>
</footer>
