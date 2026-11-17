<script lang="ts">
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import carouselData from '#lib/assets/carousel/AltText.json';
	import type { Picture } from '@sveltejs/enhanced-img';

	// Load and optimize images from assets at build time. Keep the variants close to the
	// carousel's rendered size so the full-resolution originals are never sent to phones.
	const imageFiles = import.meta.glob<{ default: Picture }>(
		'/src/lib/assets/carousel/*.{jpg,png,jpeg}',
		{
			eager: true,
			query: { enhanced: true, w: '360;540;720' }
		}
	);

	const images = carouselData.map((image) => ({
		src: imageFiles[`/src/lib/assets/carousel/${image.src}`].default,
		alt: image.alt
	}));

	let carousel: HTMLDivElement;

	// Manual scrolling, only offered when the automatic animation is disabled (reduced motion).
	function scrollCarousel(direction: number) {
		carousel.scrollBy({ left: direction * 350, behavior: 'smooth' });
	}
</script>

{#snippet imageList(decorative: boolean)}
	<ul
		class="infinite-scroll flex items-center justify-center md:justify-start"
		aria-hidden={decorative || undefined}
		role={decorative ? 'presentation' : undefined}
	>
		{#each images as image}
			<li class="mx-2 md:mx-4">
				<enhanced:img
					class="h-40 w-auto max-w-none rounded-xl sm:h-52 md:h-64 md:rounded-[1.25rem]"
					src={image.src}
					alt={decorative ? '' : image.alt}
					sizes="(min-width: 768px) 360px, 220px"
					loading="lazy"
				/>
			</li>
		{/each}
	</ul>
{/snippet}

<div class="relative">
	<div class="absolute top-1/2 left-4 z-10 hidden -translate-y-1/2 motion-reduce:block">
		<ActionButton
			type="secondary"
			shape="square"
			aria-label="Scroll images left"
			onclick={() => scrollCarousel(-1)}
		>
			<span class="icon-[material-symbols--arrow-back] size-6" aria-hidden="true"></span>
		</ActionButton>
	</div>

	<div class="absolute top-1/2 right-4 z-10 hidden -translate-y-1/2 motion-reduce:block">
		<ActionButton
			type="secondary"
			shape="square"
			aria-label="Scroll images right"
			onclick={() => scrollCarousel(1)}
		>
			<span class="icon-[material-symbols--arrow-forward] size-6" aria-hidden="true"></span>
		</ActionButton>
	</div>

	<div
		bind:this={carousel}
		class="inline-flex w-full scrollbar-none flex-nowrap overflow-x-hidden mask-[linear-gradient(to_right,transparent_0,black_32px,black_calc(100%-32px),transparent_100%)] pb-6 motion-reduce:overflow-x-auto md:mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)] md:pb-12"
	>
		{@render imageList(false)}
		{@render imageList(true)}
	</div>
</div>
