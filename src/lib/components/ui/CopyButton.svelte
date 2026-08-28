<script lang="ts">
	import { onDestroy, type Snippet } from 'svelte';
	import { type ButtonVariant, getButtonStyle } from './button';
	import { copyWithFeedback } from './copyButton';
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
	let cancelReset: (() => void) | undefined;
	let classNames = $derived(getButtonStyle(type, isDisabled, extraClass));

	async function copy() {
		if (copying || isDisabled) return;

		copying = true;
		cancelReset?.();

		try {
			cancelReset = await copyWithFeedback({
				text: value,
				writeText: (text) => navigator.clipboard.writeText(text),
				setCopied: (nextCopied) => (copied = nextCopied),
				scheduleReset: (reset, delay) => {
					const timeout = window.setTimeout(reset, delay);
					return () => window.clearTimeout(timeout);
				}
			});
		} catch {
			copied = false;
		} finally {
			copying = false;
		}
	}

	onDestroy(() => cancelReset?.());
</script>

<button
	type="button"
	onclick={copy}
	class={classNames}
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
