<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';
	type Gap = 'sm' | 'md' | 'lg';
	type Ratio = 'equal' | 'left-wide' | 'right-wide';
	const gapClasses: Record<Gap, string> = {
		sm: 'gap-4',
		md: 'gap-4 lg:gap-6',
		lg: 'gap-6 lg:gap-8'
	};
	const columnClasses: Record<Ratio, string> = {
		equal: 'lg:grid-cols-2',
		'left-wide': 'lg:grid-cols-3',
		'right-wide': 'lg:grid-cols-3'
	};

	export interface Props {
		left: Snippet;
		right: Snippet;
		gap?: Gap;
		ratio?: Ratio;
		reverseOnSmall?: boolean;
		extraClass?: string;
	}

	let {
		left,
		right,
		gap = 'lg',
		ratio = 'equal',
		reverseOnSmall = false,
		extraClass
	}: Props = $props();

	let layoutClasses = $derived(
		classNames('grid grid-cols-1', gapClasses[gap], columnClasses[ratio], extraClass)
	);

	let leftClasses = $derived(
		classNames('flex min-w-0', {
			'order-2 lg:order-1': reverseOnSmall,
			'lg:col-span-2': ratio === 'left-wide'
		})
	);

	let rightClasses = $derived(
		classNames('flex min-w-0', {
			'order-1 lg:order-2': reverseOnSmall,
			'lg:col-span-2': ratio === 'right-wide'
		})
	);
</script>

<div class={layoutClasses}>
	<div class={leftClasses}>
		{@render left()}
	</div>
	<div class={rightClasses}>
		{@render right()}
	</div>
</div>
