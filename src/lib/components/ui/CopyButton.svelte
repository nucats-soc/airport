<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { type ButtonVariant, getButtonStyle } from './button';
	import Icon from './Icon.svelte';

	interface Props {
		children?: Snippet;
		value: string;
		type: ButtonVariant;
		copiedLabel?: string;
		extraClass?: string;
		isDisabled?: boolean;
		ariaLabel?: string;
	}

	let {
		children,
		value,
		type,
		copiedLabel = 'Copied',
		extraClass,
		isDisabled,
		ariaLabel
	}: Props = $props();

	let copied = $state(false);
	let copying = false;
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		if (copying || isDisabled) return;

		copying = true;
		if (resetTimer !== undefined) {
			clearTimeout(resetTimer);
			resetTimer = undefined;
		}

		try {
			await navigator.clipboard.writeText(value);
			copied = true;
			resetTimer = setTimeout(() => {
				copied = false;
				resetTimer = undefined;
			}, 1500);
		} catch {
			copied = false;
		} finally {
			copying = false;
		}
	}

	onDestroy(() => {
		if (resetTimer !== undefined) clearTimeout(resetTimer);
	});
</script>

<button
	type="button"
	onclick={copy}
	class={getButtonStyle(type, isDisabled, extraClass)}
	disabled={isDisabled}
	aria-label={ariaLabel}
>
	<span class="grid" aria-live="polite">
		<span
			class="copy-button-state col-start-1 row-start-1 flex items-center justify-center gap-4"
			class:copy-button-state-hidden={copied}
			aria-hidden={copied}
		>
			<Icon icon="icon-[material-symbols--content-copy]" size="sm" />
			{#if children}
				{@render children()}
			{:else}
				Copy
			{/if}
		</span>
		<span
			class="copy-button-state col-start-1 row-start-1 flex items-center justify-center gap-4"
			class:copy-button-state-hidden={!copied}
			aria-hidden={!copied}
		>
			<Icon icon="icon-[material-symbols--check]" size="sm" />
			{copiedLabel}
		</span>
	</span>
</button>

<style>
	.copy-button-state {
		transition:
			opacity 180ms ease,
			transform 180ms cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.copy-button-state-hidden {
		pointer-events: none;
		transform: scale(0.75);
		opacity: 0;
	}

	@media (prefers-reduced-motion: reduce) {
		.copy-button-state {
			transition: none;
		}
	}
</style>
