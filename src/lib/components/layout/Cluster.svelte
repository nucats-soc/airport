<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Gap = 'none' | 'sm' | 'md' | 'lg';
	type Alignment = 'start' | 'center' | 'end' | 'stretch';
	type Justification = 'start' | 'center' | 'end' | 'between';

	interface Props {
		children?: Snippet;
		gap?: Gap;
		align?: Alignment;
		justify?: Justification;
		collapse?: boolean;
		extraClass?: string;
	}

	let {
		children,
		gap = 'md',
		align = 'center',
		justify = 'start',
		collapse = false,
		extraClass
	}: Props = $props();

	let classes = $derived(
		classNames(
			'flex',
			collapse && 'flex-col lg:flex-row',
			{
				'gap-4': gap == 'sm',
				'gap-6': gap == 'md',
				'gap-8': gap == 'lg'
			},
			{
				'items-start': align == 'start',
				'items-center': align == 'center',
				'items-stretch': align == 'stretch',
				'items-end': align == 'end'
			},
			{
				'justify-start': justify == 'start',
				'justify-center': justify == 'center',
				'justify-end': justify == 'end',
				'justify-between': justify == 'between'
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
