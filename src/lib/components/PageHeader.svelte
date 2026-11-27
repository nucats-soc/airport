<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';

	interface Props {
		image: Picture;
		title: string;
		description: string;
	}

	let { image, title, description }: Props = $props();
</script>

<div class="box p-0">
	<enhanced:img
		src={image}
		alt=""
		class="aspect-video w-full object-cover sm:aspect-3/1"
		sizes="(min-width: 964px) 900px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
		loading="eager"
		fetchpriority="high"
	/>
	<div
		class="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-8"
	>
		<div class="flex flex-col">
			<h1 class="tx-header">{title}</h1>
			<p class="tx-base-muted text-xl leading-snug">{description}</p>
		</div>
	</div>
</div>
