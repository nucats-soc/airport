<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	export interface Props {
		left: Snippet;
		right: Snippet;
		gap?: 'sm' | 'md' | 'lg';
		ratio?: 'equal' | 'left-wide' | 'right-wide';
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
		classNames(
			{
				'gap-4': gap == 'sm',
				'gap-4 lg:gap-6': gap == 'md',
				'gap-6 lg:gap-8': gap == 'lg',
				'lg:grid-cols-2': ratio == 'equal',
				'lg:grid-cols-3': ratio != 'equal'
			},
			'grid',
			'grid-cols-1',
			extraClass
		)
	);

	let leftClasses = $derived(
		classNames('flex min-w-0', {
			'order-2 lg:order-1': reverseOnSmall,
			'lg:col-span-2': ratio == 'left-wide'
		})
	);

	let rightClasses = $derived(
		classNames('flex min-w-0', {
			'order-1 lg:order-2': reverseOnSmall,
			'lg:col-span-2': ratio == 'right-wide'
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
