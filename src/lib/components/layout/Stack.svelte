<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Gap = 'sm' | 'md' | 'lg';
	type Alignment = 'start' | 'center' | 'end' | 'stretch';

	interface Props {
		children?: Snippet;
		gap?: Gap;
		align?: Alignment;
		extraClass?: string;
	}

	let { children, gap = 'md', align = 'stretch', extraClass }: Props = $props();

	let classes = $derived(
		classNames(
			'flex flex-col',
			{
				'gap-4': gap == 'sm',
				'gap-6': gap == 'md',
				'gap-8': gap == 'lg'
			},
			{
				'items-start': align == 'start',
				'items-center': align == 'center',
				'items-end': align == 'end',
				'items-stretch': align == 'stretch'
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
