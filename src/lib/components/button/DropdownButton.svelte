<script lang="ts">
	import type { ButtonProps } from './button.ts';
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import type { Snippet } from 'svelte';
	import { fly } from 'svelte/transition';
	import ExpandCollapseArrow from '#lib/components/icon/ExpandCollapseArrow.svelte';

	type Props = Omit<ButtonProps, 'between' | 'children'> & {
		children: Snippet<[() => void]>;
		buttonLabel?: Snippet<[boolean]>;
	};

	let { children, buttonLabel, ...buttonProps }: Props = $props();

	let open = $state(false);

	let container = $state<HTMLDivElement>();

	function handleClick(event: MouseEvent) {
		if (open && event.target instanceof Node && !container?.contains(event.target)) {
			open = false;
		}
	}
</script>

<svelte:window onclick={handleClick} />

<div bind:this={container} class={['relative', buttonProps.fill ? 'w-full' : 'w-fit']}>
	<ActionButton onclick={() => (open = !open)} {...buttonProps} between>
		<span class="flex items-center gap-xs">
			{@render buttonLabel?.(open)}
		</span>
		<ExpandCollapseArrow expanded={open} />
	</ActionButton>

	{#if open}
		<div
			class="absolute top-full left-1/2 z-40 mt-xs w-max max-w-[calc(100vw-2rem)] -translate-x-1/2"
			transition:fly={{ y: -4, duration: 150 }}
		>
			<div class="rounded-xl bg-zinc-700 p-md">
				{@render children(close)}
			</div>
		</div>
	{/if}
</div>
