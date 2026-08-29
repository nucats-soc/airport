<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Gap = 'sm' | 'md' | 'lg';
	type Alignment = 'start' | 'center' | 'end' | 'stretch';
	const gapClasses: Record<Gap, string> = {
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

	interface Props {
		children: Snippet;
		gap?: Gap;
		align?: Alignment;
		extraClass?: string;
	}

	let { children, gap = 'md', align = 'stretch', extraClass }: Props = $props();

	let classes = $derived(
		classNames('flex flex-col', gapClasses[gap], alignmentClasses[align], extraClass)
	);
</script>

<div class={classes}>
	{@render children()}
</div>
