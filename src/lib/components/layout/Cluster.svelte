<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Gap = 'none' | 'sm' | 'md' | 'lg';
	type Alignment = 'start' | 'center' | 'end' | 'stretch';
	type Justification = 'start' | 'center' | 'end' | 'between';
	const gapClasses: Record<Gap, string | undefined> = {
		none: undefined,
		sm: 'gap-4',
		md: 'gap-6',
		lg: 'gap-8'
	};
	const alignmentClasses: Record<Alignment, string> = {
		start: 'items-start',
		center: 'items-center',
		end: 'items-end',
		stretch: 'items-stretch'
	};
	const justificationClasses: Record<Justification, string> = {
		start: 'justify-start',
		center: 'justify-center',
		end: 'justify-end',
		between: 'justify-between'
	};

	interface Props {
		children: Snippet;
		gap?: Gap;
		align?: Alignment;
		justify?: Justification;
		extraClass?: string;
	}

	let { children, gap = 'md', align = 'center', justify = 'start', extraClass }: Props = $props();

	let classes = $derived(
		classNames(
			'flex',
			gapClasses[gap],
			alignmentClasses[align],
			justificationClasses[justify],
			extraClass
		)
	);
</script>

<div class={classes}>
	{@render children()}
</div>
