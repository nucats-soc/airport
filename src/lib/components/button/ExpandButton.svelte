<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { slide } from 'svelte/transition';
	import ActionButton from './ActionButton.svelte';
	import ExpandCollapseArrow from '#lib/components/icon/ExpandCollapseArrow.svelte';

	type Props = Omit<ComponentProps<typeof ActionButton>, 'between' | 'onclick'> & {
		/** Button content; receives whether the section is expanded. */
		buttonLabel?: Snippet<[expanded: boolean]>;
		noArrow?: boolean;
	};

	let { children, buttonLabel, noArrow = false, ...buttonProps }: Props = $props();

	const contentId = $props.id();

	let expanded = $state(false);
</script>

<div>
	<ActionButton
		{...buttonProps}
		between
		aria-expanded={expanded}
		aria-controls={contentId}
		onclick={() => (expanded = !expanded)}
	>
		{#if buttonLabel}
			<span class="flex items-center gap-xs">
				{@render buttonLabel(expanded)}
			</span>
		{/if}
		{#if !noArrow}
			<ExpandCollapseArrow {expanded} />
		{/if}
	</ActionButton>
	{#if expanded}
		<div id={contentId} transition:slide={{ duration: prefersReducedMotion.current ? 0 : 300 }}>
			{@render children?.()}
		</div>
	{/if}
</div>
