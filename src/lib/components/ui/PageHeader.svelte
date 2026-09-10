<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import classNames from 'classnames';
	import type { Picture } from '@sveltejs/enhanced-img';

	interface Props {
		image: Picture;
		title: string;
		description: string;
		compact?: boolean;
	}

	let { image, title, description, compact = false }: Props = $props();
	let imageClasses = $derived(
		classNames('w-full object-cover', {
			'aspect-video sm:aspect-3/1': !compact,
			'aspect-[16/7] sm:aspect-4/1': compact
		})
	);
</script>

<Box extraClass="relative">
	<enhanced:img
		src={image}
		alt=""
		class={imageClasses}
		sizes="(min-width: 964px) 900px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 32px)"
		loading="eager"
		fetchpriority="high"
	/>
	<div
		class="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-8"
	>
		<div class="flex flex-col">
			<h1 class="tx-page-title">{title}</h1>
			<p class="tx-tagline">{description}</p>
		</div>
	</div>
</Box>
