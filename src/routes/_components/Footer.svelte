<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';

	interface FooterLink {
		label: string;
		href: string;
		icon: string;
		external?: boolean;
	}

	const pageLinks: FooterLink[] = [
		{
			label: 'Home',
			href: '/',
			icon: 'icon-[material-symbols--home-outline]'
		},
		{
			label: 'Events',
			href: '/events',
			icon: 'icon-[material-symbols--calendar-month-outline]'
		},
		{
			label: 'Committee',
			href: '/committee',
			icon: 'icon-[material-symbols--groups]'
		},
		{
			label: 'Terms of Service',
			href: '/tos',
			icon: 'icon-[material-symbols--gavel]'
		},
		{
			label: 'Privacy Policy',
			href: '/privacy',
			icon: 'icon-[material-symbols--shield-outline]'
		}
	];

	const socialLinks: FooterLink[] = [
		{
			label: 'Discord',
			href: 'https://discord.gg/N4dJQdafrd',
			icon: 'icon-[simple-icons--discord]',
			external: true
		},
		{
			label: 'Instagram',
			href: 'https://instagram.com/nucats_',
			icon: 'icon-[simple-icons--instagram]',
			external: true
		},
		{
			label: 'GitHub',
			href: 'https://github.com/NUCats-soc',
			icon: 'icon-[simple-icons--github]',
			external: true
		},
		{
			label: 'Linktree',
			href: 'https://linktr.ee/nucats',
			icon: 'icon-[simple-icons--linktree]',
			external: true
		}
	];

	const studentsUnionLinks: FooterLink[] = [
		{
			label: 'Join NUCATS',
			href: 'https://nusu.co.uk/activities/view-society/131',
			icon: 'icon-[material-symbols--person-add-outline]',
			external: true
		},
		{
			label: "Students' Union",
			href: 'https://nusu.co.uk/',
			icon: 'icon-[material-symbols--school-outline]',
			external: true
		}
	];
</script>

{#snippet linkList(links: FooterLink[])}
	<ul class="flex flex-col gap-3">
		{#each links as link}
			<li>
				<a
					href={link.href}
					target={link.external ? '_blank' : undefined}
					rel={link.external ? 'noopener noreferrer' : undefined}
					class="group inline-flex items-center gap-2 text-zinc-300 transition-colors hover:text-indigo-200"
				>
					<Icon icon={link.icon} size="sm" />
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
					<a href="/" class="flex w-fit shrink-0 items-center gap-4" aria-label="NUCATS home">
						<img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50" />
						<span class="tx-brand text-white">NUCATS</span>
					</a>
					<p class="tx-body mt-3 max-w-sm text-zinc-400">
						Newcastle University Computing and Technology Society
					</p>
				</div>

				<nav aria-labelledby="footer-pages-heading">
					<h2 id="footer-pages-heading" class="tx-item-title mb-4">Pages</h2>
					{@render linkList(pageLinks)}
				</nav>

				<nav aria-labelledby="footer-socials-heading">
					<h2 id="footer-socials-heading" class="tx-item-title mb-4">Find NUCATS</h2>
					{@render linkList(socialLinks)}
				</nav>

				<nav aria-labelledby="footer-union-heading">
					<h2 id="footer-union-heading" class="tx-item-title mb-4">Students' Union</h2>
					{@render linkList(studentsUnionLinks)}
				</nav>
			</div>
			<Cluster gap="xs">
				<Icon
					icon="icon-[material-symbols--design-services]"
					size="sm"
					extraClass="text-indigo-400"
				/>
				<p class="tx-body text-zinc-400">
					Crafted in the North East by
					<a
						href="https://amnexya.com"
						class="text-indigo-400 hover:text-indigo-300 hover:underline">Jack</a
					>
					and
					<a
						href="https://www.linkedin.com/in/tyler-walker-502960430"
						class="text-indigo-400 hover:text-indigo-300 hover:underline">Tyler</a
					>. AGPL licensed source code available on
					<a
						href="https://github.com/nucats-soc/airport"
						class="text-indigo-400 hover:text-indigo-300 hover:underline">GitHub</a
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
