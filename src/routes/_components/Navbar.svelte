<script lang="ts">
	import { page } from '$app/state';
	import DropdownButton from '#lib/components/button/DropdownButton.svelte';
	import { getHref, getLinks } from '#lib/links.js';

	const navItems = getLinks('home', 'events', 'committee');

	function isActive(href: string): boolean {
		return page.url.pathname === href || (href !== '/' && page.url.pathname.startsWith(`${href}/`));
	}
</script>

<header class="sticky top-0 z-50 w-full bg-zinc-900 pt-8">
	<div class="page-container row relative justify-between pb-8">
		<a href={getHref('home')} class="row shrink-0 gap-sm" aria-label="NUCATS home">
			<img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50" />
			<span class="text-2xl leading-none font-extrabold tracking-normal text-white">NUCATS</span>
		</a>

		<nav class="hidden md:block" aria-label="Primary navigation">
			<ul class="row gap-lg">
				{#each navItems as item}
					<li>
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class={[
								'tx-base row gap-sm leading-5 whitespace-nowrap transition-colors duration-200 hover:text-brand-light',
								isActive(item.href) ? 'text-brand-light' : 'text-white'
							]}
						>
							<span class={[item.icon, 'size-6 shrink-0']} aria-hidden="true"></span>
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="md:hidden">
			<DropdownButton type="tertiary" shape="square" noArrow fullWidth aria-label="Navigation menu">
				{#snippet buttonLabel(open)}
					<span
						class={[
							open
								? 'icon-[material-symbols--close-rounded]'
								: 'icon-[material-symbols--menu-rounded]',
							'size-8'
						]}
						aria-hidden="true"
					></span>
				{/snippet}

				{#snippet children(close)}
					<nav aria-label="Mobile navigation">
						<ul class="flex flex-col gap-1">
							{#each navItems as item}
								<li>
									<a
										href={item.href}
										aria-current={isActive(item.href) ? 'page' : undefined}
										class={[
											'tx-base row min-h-12 gap-sm rounded-lg px-sm leading-5 transition-colors duration-200 hover:bg-white/10 hover:text-brand-light',
											isActive(item.href) ? 'bg-white/10 text-brand-light' : 'text-white'
										]}
										onclick={close}
									>
										<span class={[item.icon, 'size-6 shrink-0']} aria-hidden="true"></span>
										{item.label}
									</a>
								</li>
							{/each}
						</ul>
					</nav>
				{/snippet}
			</DropdownButton>
		</div>
	</div>
</header>
