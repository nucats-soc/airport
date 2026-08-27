<script lang="ts">
	import { page } from '$app/state';
	import Container from '$lib/components/layout/Container.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import MenuToggleIcon from './MenuToggleIcon.svelte';

	const navItems = [
		{ label: 'Home', href: '/', icon: 'icon-[material-symbols--home-outline]' },
		{ label: 'Events', href: '/events', icon: 'icon-[material-symbols--calendar-month-outline]' },
		{ label: 'Committee', href: '/committee', icon: 'icon-[material-symbols--groups]' }
		// { label: 'Sponsors', href: '/sponsors', icon: 'icon-[material-symbols--apartment]' }
	];
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

<header class="sticky pt-8 top-0 z-50 w-full bg-[#18181b]">
	<Container extraClass="pb-8">
		<div class="flex items-center justify-between gap-4 md:gap-8">
			<a href="/" class="flex shrink-0 items-center gap-4" aria-label="NUCATS home">
				<img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50" />
				<span class="tx-brand text-white">NUCATS</span>
			</a>

			<nav class="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
				{#each navItems as item}
					<a
						href={item.href}
						aria-current={isActive(item.href) ? 'page' : undefined}
						class="tx-nav-link group flex items-center gap-4 whitespace-nowrap text-white transition-colors duration-200 hover:text-indigo-300"
						class:text-indigo-300={isActive(item.href)}
					>
						<Icon
							icon={item.icon}
							extraClass={`text-white transition-colors duration-200 group-hover:text-indigo-300 ${isActive(item.href) ? 'text-indigo-300' : ''}`}
						/>
						<span>{item.label}</span>
					</a>
				{/each}
			</nav>

			<button
				type="button"
				class="flex size-12 items-center justify-center rounded-lg text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 md:hidden"
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
								class={`tx-nav-link flex min-h-12 items-center gap-4 rounded-lg px-4 text-white transition-colors duration-200 hover:bg-white/10 hover:text-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300 ${isActive(item.href) ? 'bg-white/10 text-indigo-300' : ''}`}
								onclick={closeMenu}
							>
								<Icon icon={item.icon} />
								<span>{item.label}</span>
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</Container>
</header>
