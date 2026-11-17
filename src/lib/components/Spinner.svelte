<script lang="ts">
	import type { Picture } from '@sveltejs/enhanced-img';
	import type { ClassValue } from 'svelte/elements';
	import spinner from '#lib/assets/spinner.gif';
	import staticSpinner from '#lib/assets/spinner-static.png?enhanced';

	interface Props {
		label?: string;
		class?: ClassValue;
	}

	let { label = 'Loading', class: className }: Props = $props();

	function sourcesOf(image: Picture) {
		return Object.entries(image.sources);
	}
</script>

<div
	class={['flex flex-col items-center justify-center gap-md', className]}
	role="status"
	aria-label={label}
	aria-live="polite"
>
	<div class="box">
		<picture>
			{#each sourcesOf(staticSpinner) as [format, srcset]}
				<source media="(prefers-reduced-motion: reduce)" {srcset} type={'image/' + format} />
			{/each}
			<source media="(prefers-reduced-motion: reduce)" srcset={staticSpinner.img.src} />
			<img class="size-32" src={spinner} alt="Loading spinner" width="512" height="512" />
		</picture>
	</div>
	<p>look I'm a DVD!</p>
</div>
