<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	type Space = 'sm' | 'md' | 'lg';
	const spaceClasses: Record<Space, string> = {
		sm: 'p-4',
		md: 'p-6',
		lg: 'p-8'
	};

	interface Props {
		children: Snippet;
		space?: Space;
		extraClass?: string;
	}

	let { children, space = 'md', extraClass }: Props = $props();

	let classes = $derived(classNames(spaceClasses[space], extraClass));
</script>

<div class={classes}>
	{@render children()}
</div>
