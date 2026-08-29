<script lang="ts">
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import type { ButtonVariant } from '$lib/components/ui/button';
	import classNames from 'classnames';
	import { onMount, type Snippet } from 'svelte';
	import Icon from './Icon.svelte';

	interface Props {
		children: Snippet<[close: () => void]>;
		label: string;
		type: ButtonVariant;
		extraClass?: string;
		showArrow?: boolean;
		ariaLabel?: string;
	}

	let { children, label, showArrow = true, ariaLabel, ...buttonProps }: Props = $props();
	let dropdownElement: HTMLDivElement;
	let open = $state(false);
	let dropdownId = $props.id();

	function close() {
		open = false;
	}

	onMount(() => {
		function onDocumentClick(event: MouseEvent) {
			if (open && event.target instanceof Node && !dropdownElement.contains(event.target)) {
				close();
			}
		}

		document.addEventListener('click', onDocumentClick);
		return () => document.removeEventListener('click', onDocumentClick);
	});

	let dropdownClass = $derived(
		classNames('absolute top-full left-0 z-40 w-full origin-top transition duration-200', {
			'pointer-events-auto scale-100 opacity-100': open,
			'pointer-events-none scale-95 opacity-0': !open
		})
	);
	let arrowClass = $derived(
		classNames('block transition-transform', {
			'rotate-180': open
		})
	);
</script>

<div bind:this={dropdownElement} class="relative inline-block">
	<ActionButton
		onClick={() => (open = !open)}
		ariaExpanded={open}
		ariaControls={dropdownId}
		{ariaLabel}
		{...buttonProps}
	>
		{label}
		{#if showArrow}
			<span class="size-6 shrink-0">
				<Icon icon="icon-[material-symbols--arrow-drop-down]" extraClass={arrowClass} />
			</span>
		{/if}
	</ActionButton>

	<div id={dropdownId} class={dropdownClass}>
		<div
			class="absolute top-0 left-1/2 z-50 mt-2 size-5 -translate-x-1/2 rotate-45 bg-zinc-700"
			aria-hidden="true"
		></div>
		<div
			class="relative left-1/2 mt-4 w-max max-w-[calc(100vw-2rem)] min-w-full -translate-x-1/2 rounded-md bg-zinc-700 p-4"
		>
			{@render children(close)}
		</div>
	</div>
</div>
