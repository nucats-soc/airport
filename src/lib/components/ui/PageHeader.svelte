<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';

	interface Props {
		image: string;
		title: string;
		description: string;
	}

	let { image, title, description }: Props = $props();
</script>

<Box extraClass="relative">
	<img src={image} alt="" class="aspect-video w-full object-cover sm:aspect-3/1" />
	<div
		class="absolute inset-0 flex items-end bg-linear-to-t from-black/80 via-black/40 to-transparent p-4 sm:p-8"
	>
		<div class="flex flex-col">
			<h1 class="tx-page-title">{title}</h1>
			<p class="tx-tagline">{description}</p>
		</div>
	</div>
</Box>
