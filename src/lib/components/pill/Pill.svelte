<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
		icon?: string;
		extraClass?: string;
	}

	let { children, icon, extraClass }: Props = $props();
</script>

<div
	class={['inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 leading-5', extraClass]}
>
	{#if icon}
		<span class={['size-4 shrink-0', icon]} aria-hidden="true"></span>
	{/if}
	{@render children()}
</div>
