<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Space = 'sm' | 'md' | 'lg';

	interface Props {
		children?: Snippet;
		space?: Space;
		extraClass?: string;
	}

	let { children, space = 'md', extraClass }: Props = $props();

	let classes = $derived(
		classNames(
			{
				'p-4': space == 'sm',
				'p-6': space == 'md',
				'p-8': space == 'lg'
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
