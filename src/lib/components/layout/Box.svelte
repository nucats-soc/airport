<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Background = 'none' | 'card' | 'raised';

	interface Props {
		children?: Snippet;
		background?: Background;
		allowOverflow?: boolean;
		extraClass?: string;
	}

	let { children, background = 'none', allowOverflow = false, extraClass }: Props = $props();

	let classes = $derived(
		classNames(
			'rounded-[1.25rem]',
			{
				'overflow-hidden': !allowOverflow,
				'overflow-visible': allowOverflow
			},
			{
				'bg-zinc-800': background == 'card',
				'bg-zinc-700': background == 'raised'
			},
			extraClass
		)
	);
</script>

<div class={classes}>
	{#if children}
		{@render children()}
	{/if}
</div>
