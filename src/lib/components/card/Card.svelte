<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	export interface Props {
		type?: 'horizontal' | 'vertical';
		padding?: 'sm' | 'md' | 'lg';
		thumbnail?: Snippet;
		children?: Snippet;
		footer?: Snippet;
		extraClass?: string;
	}

	let {
		type = 'vertical',
		padding = 'md',
		thumbnail,
		children,
		footer,
		extraClass
	}: Props = $props();

	let cardClasses = $derived(
		classNames(
			{
				'flex-col md:flex-row': type == 'horizontal',
				'flex-col': type == 'vertical'
			},
			'bg-zinc-800',
			'rounded-[1.25rem]',
			'flex',
			'flex-1',
			'min-w-0',
			'overflow-hidden',
			extraClass
		)
	);

	let contentClasses = $derived(
		classNames(
			{
				'gap-4 p-4': padding == 'sm',
				'gap-6 p-6': padding == 'md',
				'gap-8 p-8': padding == 'lg'
			},
			'flex',
			'flex-1',
			'flex-col',
			'min-w-0'
		)
	);

	let thumbnailClasses = $derived(
		classNames(
			{
				'w-full md:w-fit': type == 'horizontal',
				'w-full': type == 'vertical'
			},
			'flex',
			'min-w-0',
			'items-center',
			'justify-center',
			'overflow-hidden'
		)
	);
</script>

<div class={cardClasses}>
	{#if thumbnail}
		<div class={thumbnailClasses}>
			{@render thumbnail()}
		</div>
	{/if}

	<div class={contentClasses}>
		<div class="flex flex-col gap-4">
			{#if children}
				{@render children()}
			{/if}
		</div>

		{#if footer}
			<div class="mt-auto flex justify-center">
				{@render footer()}
			</div>
		{/if}
	</div>
</div>
