<script lang="ts">
	import Button from '$lib/components/ui/ActionButton.svelte';
	import carouselData from '$lib/assets/carousel/AltText.json';
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

	// Manual carousel scroll
	function scrollCarousel(direction: number) {
		carousel.scrollBy({
			left: direction * 350,
			behavior: 'smooth'
		});
	}
</script>

<div class="relative">
	<!-- Conditional if reduce motion is enabled -->
	<div class="absolute top-1/2 left-4 z-10 -translate-y-1/2">
		<Button type="icon" onClick={() => scrollCarousel(-1)} extraClass="carousel-button">←</Button>
	</div>

	<div class="absolute top-1/2 right-4 z-10 -translate-y-1/2">
		<Button type="icon" onClick={() => scrollCarousel(1)} extraClass="carousel-button">→</Button>
	</div>

	<div
		bind:this={carousel}
		class="carousel-container inline-flex w-full scrollbar-none flex-nowrap mask-[linear-gradient(to_right,transparent_0,black_32px,black_calc(100%-32px),transparent_100%)] pb-6 md:mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)] md:pb-12"
	>
		<ul class="infinite-scroll flex items-center justify-center md:justify-start">
			{#each images as image}
				<li class="mx-2 md:mx-4">
					<enhanced:img
						class="h-auto w-auto max-h-40 max-w-none rounded-xl sm:max-h-52 md:max-h-64 md:rounded-[1.25rem]"
						src={image.src}
						alt={image.alt}
						sizes="(min-width: 768px) 360px, 220px"
						loading="lazy"
					/>
				</li>
			{/each}
		</ul>

		<ul
			class="infinite-scroll flex items-center justify-center md:justify-start"
			aria-hidden="true"
			role="presentation"
		>
			{#each images as image}
				<li class="mx-2 md:mx-4">
					<enhanced:img
						class="h-auto w-auto max-h-40 max-w-none rounded-xl sm:max-h-52 md:max-h-64 md:rounded-[1.25rem]"
						src={image.src}
						alt=""
						sizes="(min-width: 768px) 360px, 220px"
						loading="lazy"
					/>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.carousel-container {
		overflow-x: hidden;
	}

	@media (prefers-reduced-motion: reduce) {
		.carousel-container {
			overflow-x: auto;
		}
	}
</style>
