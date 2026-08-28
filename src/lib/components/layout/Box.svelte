<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Background = 'none' | 'card' | 'raised';
	const backgroundClasses: Record<Background, string | undefined> = {
		none: undefined,
		card: 'bg-zinc-800',
		raised: 'bg-zinc-700'
	};

	interface Props {
		children: Snippet;
		background?: Background;
		allowOverflow?: boolean;
		extraClass?: string;
	}

	let { children, background = 'none', allowOverflow = false, extraClass }: Props = $props();

	let classes = $derived(
		classNames(
			'rounded-[1.25rem]',
			allowOverflow ? 'overflow-visible' : 'overflow-hidden',
			backgroundClasses[background],
			extraClass
		)
	);
</script>

<div class={classes}>
	{@render children()}
</div>
