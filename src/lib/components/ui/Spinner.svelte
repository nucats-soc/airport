<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import spinner from '$lib/assets/spinner.gif';
	import staticSpinner from '$lib/assets/spinner-static.png?enhanced';
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';

	interface Props {
		label?: string;
		extraClass?: string;
		imageClass?: string;
	}

	let { label = 'Loading', extraClass, imageClass = 'size-32' }: Props = $props();

	function sourcesOf(image: Picture) {
		return Object.entries(image.sources);
	}
</script>

<div
	class={['flex items-center justify-center', extraClass]}
	role="status"
	aria-label={label}
	aria-live="polite"
>
	<Stack align="center">
		<Box background="card">
			<Inset space="md">
				<picture>
					{#each sourcesOf(staticSpinner) as [format, srcset]}
						<source media="(prefers-reduced-motion: reduce)" {srcset} type={'image/' + format} />
					{/each}
					<source media="(prefers-reduced-motion: reduce)" srcset={staticSpinner.img.src} />
					<img class={imageClass} src={spinner} alt="Loading spinner" width="512" height="512" />
				</picture>
			</Inset>
		</Box>
		<p>look I'm a DVD!</p>
	</Stack>
</div>
