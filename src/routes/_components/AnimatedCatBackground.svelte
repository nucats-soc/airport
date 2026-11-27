<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let visibilityState = $state<DocumentVisibilityState>('visible');
</script>

<svelte:document bind:visibilityState />

<div class="relative overflow-hidden">
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div
			class={[
				"absolute inset-0 animate-drift bg-[url('/bg-patt.svg')] bg-repeat opacity-3 motion-reduce:animate-none",
				visibilityState !== 'visible' && '[animation-play-state:paused]'
			]}
		></div>
		<div class="absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#18181b] to-transparent"></div>
		<div
			class="absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-[#18181b]"
		></div>
	</div>

	<div class="relative">
		{@render children()}
	</div>
</div>
