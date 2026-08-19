<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="relative overflow-hidden">
	<div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
		<div
			class="absolute inset-0 animate-drift bg-[url('/bg-patt.svg')] bg-repeat opacity-2 motion-reduce:animate-none"
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
