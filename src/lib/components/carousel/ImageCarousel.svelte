<script lang="ts">
	import Button from '$lib/components/button/ActionButton.svelte';
	import carouselData from '$lib/assets/carousel/AltText.json';

	// Load images from assets
	const imageFiles = import.meta.glob<string>('/src/lib/assets/carousel/*.{jpg,png,jpeg}', {
		eager: true,
		import: 'default'
	});

	const images = carouselData.map((image) => ({
		src: imageFiles[`/src/lib/assets/carousel/${image.src}`],
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
		class="inline-flex w-full scrollbar-none flex-nowrap overflow-x-auto mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)] pb-12"
	>
		<ul class="infinite-scroll flex items-center justify-center md:justify-start">
			{#each images as image}
				<li class="mx-4">
					<img
						class="max-h-64 max-w-none rounded-[1.25rem]"
						src={image.src}
						alt={image.alt}
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
				<li class="mx-4">
					<img
						class="max-h-64 max-w-none rounded-[1.25rem]"
						src={image.src}
						alt=""
						loading="lazy"
					/>
				</li>
			{/each}
		</ul>
	</div>
</div>
