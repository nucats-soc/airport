<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type ButtonVariant, getButtonStyle } from './button';

	type Props = {
		children: Snippet;
		type: ButtonVariant;
		onClick: () => void;
		extraClass?: string;
		isDisabled?: boolean;
		isSelected?: boolean;
		ariaLabel?: string;
		ariaExpanded?: boolean;
		ariaControls?: string;
	};

	let {
		children,
		type,
		extraClass,
		isDisabled,
		isSelected,
		onClick,
		ariaLabel,
		ariaExpanded,
		ariaControls
	}: Props = $props();
	let classNames = $derived(getButtonStyle(type, isDisabled, extraClass, isSelected));
</script>

<button
	type="button"
	onclick={isDisabled ? undefined : onClick}
	class={classNames}
	aria-pressed={isSelected}
	aria-label={ariaLabel}
	aria-expanded={ariaExpanded}
	aria-controls={ariaControls}
>
	{@render children()}
</button>
