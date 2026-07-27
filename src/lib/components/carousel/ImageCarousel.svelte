<script lang="ts">
	const images = Object.values(
		import.meta.glob('/src/lib/assets/carousel/*.{jpg,png,jpeg}', {
			eager: true,
			import: 'default'
		})
	);
</script>

<div
	class="inline-flex w-full flex-nowrap overflow-hidden mask-[linear-gradient(to_right,transparent_0,black_128px,black_calc(100%-200px),transparent_100%)] pb-12"
>
	<!-- /////////////////////////////////////////////////////////////
        NOTICE:
        This is a nasty, dirty, dirty, horrible hack to allow for the carousel to cleanly repeat.
        Don't remove the duplicated <ul> or I'll castrate you!!!!!
        ///////////////////////////////////////////////////////////////// -->
	<ul class="infinite-scroll flex items-center justify-center md:justify-start">
		{#each images as image}
			<li class="mx-4">
				<img class="max-h-64 max-w-none rounded-[1.25rem]" src={image} alt="Carousel Image" />
			</li>
		{/each}
	</ul>
	<ul class="infinite-scroll flex items-center justify-center md:justify-start" aria-hidden="true">
		{#each images as image}
			<li class="mx-4">
				<img class="max-h-64 max-w-none rounded-[1.25rem]" src={image} alt="Carousel Image" />
			</li>
		{/each}
	</ul>
</div>
