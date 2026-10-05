<script lang="ts">
	import type { ButtonProps } from './button.ts';
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';
	import ExpandCollapseArrow from '#lib/components/icon/ExpandCollapseArrow.svelte';

	type Props = Omit<ButtonProps, 'between'> & {
		buttonLabel?: Snippet<[boolean]>;
	};

	let { children, buttonLabel, ...buttonProps }: Props = $props();

	let expanded = $state(false);
</script>

<div class="relative">
	<ActionButton onclick={() => (expanded = !expanded)} {...buttonProps} between>
		<span class="flex items-center gap-xs">
			{@render buttonLabel?.(expanded)}
		</span>
		<ExpandCollapseArrow {expanded} />
	</ActionButton>
	{#if expanded}
		<div transition:slide>
			{@render children?.()}
		</div>
	{/if}
</div>
