<script lang="ts">
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';

	interface Props {
		children: Snippet;
		icon?: string;
		extraClass?: string;
	}

	let { children, icon, extraClass }: Props = $props();
</script>

<div
	class={['tx-body inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1', extraClass]}
>
	{#if icon}
		<Icon {icon} size="sm" />
	{/if}
	{@render children()}
</div>
