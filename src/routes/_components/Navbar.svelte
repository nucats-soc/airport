<script lang="ts">
	import { page } from '$app/state';
	import Container from '#lib/components/layout/Container.svelte';
	import Icon from '#lib/components/ui/Icon.svelte';
	import MenuToggleIcon from './MenuToggleIcon.svelte';
	import { getHref, getLinks } from '#lib/links.js';

	const navItems = getLinks('home', 'events', 'committee');
	let isMenuOpen = $state(false);

	function isActive(href: string): boolean {
		return page.url.pathname === href || (href !== '/' && page.url.pathname.startsWith(`${href}/`));
	}

	function closeMenu(): void {
		isMenuOpen = false;
	}

	function handleKeydown(event: KeyboardEvent): void {
		if (event.key === 'Escape' && isMenuOpen) {
			closeMenu();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="sticky top-0 z-50 w-full bg-[#18181b] px-2 pt-8">
	<Container extraClass="pb-8">
		<div class="flex items-center justify-between gap-4 md:gap-8">
			<a href={getHref('home')} class="flex shrink-0 items-center gap-4" aria-label="NUCATS home">
				<img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50" />
				<span class="text-2xl leading-none font-extrabold tracking-normal text-white">NUCATS</span>
			</a>

			<nav class="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
				{#each navItems as item}
					<a
						href={item.href}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class="tx-base group flex items-center gap-4 leading-5 whitespace-nowrap text-white transition-colors duration-200 hover:text-brand-light"
						class:text-brand-light={isActive(item.href)}
					>
						{#if item.icon}
							<Icon
								icon={item.icon}
								extraClass={`text-white transition-colors duration-200 group-hover:text-brand-light ${isActive(item.href) ? 'text-brand-light' : ''}`}
							/>
						{/if}
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<button
				type="button"
				class="flex size-12 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light md:hidden"
				aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
				aria-controls="mobile-navigation"
				aria-expanded={isMenuOpen}
				onclick={() => (isMenuOpen = !isMenuOpen)}
			>
				<MenuToggleIcon isOpen={isMenuOpen} />
			</button>
		</div>

		{#if isMenuOpen}
			<nav
				id="mobile-navigation"
				class="mt-6 border-t border-white/15 pt-4 md:hidden"
				aria-label="Mobile navigation"
			>
				<ul class="flex flex-col gap-1">
					{#each navItems as item}
						<li>
							<a
								href={item.href}
								aria-current={isActive(item.href) ? 'page' : undefined}
								class={`tx-base flex min-h-12 items-center gap-4 rounded-lg px-4 leading-5 text-white transition-colors duration-200 hover:bg-white/10 hover:text-brand-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-light ${isActive(item.href) ? 'bg-white/10 text-brand-light' : ''}`}
								onclick={closeMenu}
							>
								{#if item.icon}
									<Icon icon={item.icon} />
								{/if}
								<span>{item.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</Container>
</header>
