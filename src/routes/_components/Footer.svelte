<script lang="ts">
	import Container from '#lib/components/layout/Container.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import Stack from '#lib/components/layout/Stack.svelte';
	import Cluster from '#lib/components/layout/Cluster.svelte';

	import { footerLinkIds, getHref, getLinks, type LinkId } from '#lib/links.js';
</script>

{#snippet linkList(ids: readonly LinkId[])}
	<ul class="flex flex-col gap-3">
		{#each getLinks(...ids) as link}
			<li>
				<a
					href={link.href}
					target={(link.openInNewTab ?? link.external) ? '_blank' : undefined}
					rel={(link.openInNewTab ?? link.external) ? 'noopener noreferrer' : undefined}
					class="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-brand-light"
				>
					{#if link.icon}
						<Icon icon={link.icon} size="sm" />
					{/if}
					<span>{link.label}</span>
					{#if link.external}
						<span class="size-4 shrink-0 overflow-hidden">
							<Icon
								icon="icon-[material-symbols--arrow-outward]"
								size="sm"
								extraClass="external-arrow block"
							/>
						</span>
					{/if}
				</a>
			</li>
		{/each}
	</ul>
{/snippet}

<footer class="mt-20 w-full bg-zinc-950 py-10">
	<Container>
		<Stack>
			<div class="grid gap-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-8">
				<div>
					<a
						href={getHref('home')}
						class="flex w-fit shrink-0 items-center gap-4"
						aria-label="NUCATS home"
					>
						<img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50" />
						<span class="text-2xl leading-none font-extrabold tracking-normal text-white"
							>NUCATS</span
						>
					</a>
					<p class="tx-base mt-3 max-w-sm text-zinc-400">
						Newcastle University Computing and Technology Society
					</p>
				</div>

				<nav aria-labelledby="footer-pages-heading">
					<h2 id="footer-pages-heading" class="tx-header-3 mb-4">Pages</h2>
					{@render linkList(footerLinkIds.pages)}
				</nav>

				<nav aria-labelledby="footer-socials-heading">
					<h2 id="footer-socials-heading" class="tx-header-3 mb-4">Find NUCATS</h2>
					{@render linkList(footerLinkIds.socials)}
				</nav>

				<nav aria-labelledby="footer-union-heading">
					<h2 id="footer-union-heading" class="tx-header-3 mb-4">Students' Union</h2>
					{@render linkList(footerLinkIds.studentsUnion)}
				</nav>
			</div>
			<Cluster gap="xs">
				<Icon
					icon="icon-[material-symbols--design-services]"
					size="sm"
					extraClass="text-brand-light"
				/>
				<p class="tx-base text-zinc-400">
					Crafted in the North East by
					<a href={getHref('jack')} class="text-brand-light hover:text-brand-light hover:underline"
						>Jack</a
					>
					and
					<a href={getHref('tyler')} class="text-brand-light hover:text-brand-light hover:underline"
						>Tyler</a
					>. AGPL licensed source code available on
					<a
						href={getHref('source-code')}
						class="text-brand-light hover:text-brand-light hover:underline">GitHub</a
					>.
				</p>
			</Cluster>
		</Stack>
	</Container>
</footer>

<style>
	@keyframes wrap-arrow {
		0% {
			transform: translate(0) scale(100%);
		}
		49% {
			transform: translate(100%, -100%) scale(25%);
		}
		50% {
			transform: translate(-100%, 100%) scale(25%);
		}
		100% {
			transform: translate(0) scale(100%);
		}
	}

	a:hover :global(.external-arrow) {
		animation: wrap-arrow 300ms cubic-bezier(0.45, 0, 0.55, 1);
	}

	@media (prefers-reduced-motion: reduce) {
		a:hover :global(.external-arrow) {
			animation: none;
		}
	}
</style>
