<script lang="ts">
	import spinner from '$lib/assets/spinner.gif';
	import staticSpinner from '$lib/assets/spinner-static.png';
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';

	interface Props {
		label?: string;
		extraClass?: string;
		imageClass?: string;
	}

	let { label = 'Loading', extraClass, imageClass = 'size-32' }: Props = $props();
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
					<source media="(prefers-reduced-motion: reduce)" srcset={staticSpinner} />
					<img class={imageClass} src={spinner} alt="Loading spinner" />
				</picture>
			</Inset>
		</Box>
		<p>look I'm a DVD!</p>
	</Stack>
</div>
