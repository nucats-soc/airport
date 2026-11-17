<script lang="ts">
	import type { ComponentProps, Snippet } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import ActionButton from './ActionButton.svelte';
	import ExpandCollapseArrow from '#lib/components/icon/ExpandCollapseArrow.svelte';

	type Props = Omit<ComponentProps<typeof ActionButton>, 'between' | 'children' | 'onclick'> & {
		/** Dropdown content; receives a function that closes the dropdown. */
		children: Snippet<[close: () => void]>;
		/** Button content; receives whether the dropdown is open. */
		buttonLabel?: Snippet<[open: boolean]>;
		noArrow?: boolean;
		/** Stretch the panel across the nearest positioned ancestor instead of the button. */
		fullWidth?: boolean;
		align?: 'center' | 'end';
	};

	let {
		children,
		buttonLabel,
		noArrow = false,
		fullWidth = false,
		align = 'center',
		...buttonProps
	}: Props = $props();

	const panelId = $props.id();

	let open = $state(false);
	let container = $state<HTMLDivElement>();

	function close() {
		open = false;
	}

	function handleWindowClick(event: MouseEvent) {
		if (open && container && !event.composedPath().includes(container)) {
			close();
		}
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (open && event.key === 'Escape') {
			close();
		}
	}
</script>

<svelte:window onclick={handleWindowClick} onkeydown={handleWindowKeydown} />

<div
	bind:this={container}
	class={{ relative: !fullWidth, 'w-full': buttonProps.fill, 'w-fit': !buttonProps.fill }}
>
	<ActionButton
		{...buttonProps}
		between
		aria-expanded={open}
		aria-controls={panelId}
		onclick={() => (open = !open)}
	>
		{#if buttonLabel}
			<span class="flex items-center gap-xs">
				{@render buttonLabel(open)}
			</span>
		{/if}
		{#if !noArrow}
			<ExpandCollapseArrow expanded={open} />
		{/if}
	</ActionButton>

	{#if open}
		<div
			id={panelId}
			class={[
				'absolute top-full z-40 mt-xs',
				fullWidth
					? 'inset-x-0 px-4 sm:px-8'
					: [
							'w-max max-w-[calc(100vw-2rem)]',
							align === 'end' ? 'right-0' : 'left-1/2 -translate-x-1/2'
						]
			]}
			transition:fly={{ y: -4, duration: prefersReducedMotion.current ? 0 : 150 }}
		>
			<div class="rounded-xl bg-zinc-700 p-md shadow-lg">
				{@render children(close)}
			</div>
		</div>
	{/if}
</div>
