<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { ButtonProps } from './button.ts';
	import ActionButton from '#lib/components/button/ActionButton.svelte';

	type Props = ButtonProps & {
		value: string;
	};

	let { children, value, ...buttonProps }: Props = $props();

	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout>;

	async function copy() {
		await navigator.clipboard.writeText(value);

		copied = true;

		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => {
			copied = false;
		}, 1500);
	}

	onDestroy(() => clearTimeout(resetTimer));
</script>

<ActionButton onclick={copy} {...buttonProps}>
	<span class="grid" aria-live="polite">
		<span
			class="col-start-1 row-start-1 flex items-center justify-center gap-xs transition"
			class:scale-75={copied}
			class:opacity-0={copied}
			aria-hidden={copied}
		>
			<span class="icon-[material-symbols--content-copy] size-4" aria-hidden="true"></span>
			{@render children?.()}
		</span>
		<span
			class="col-start-1 row-start-1 flex items-center justify-center gap-xs transition"
			class:scale-75={!copied}
			class:opacity-0={!copied}
			aria-hidden={!copied}
		>
			<span class="icon-[material-symbols--check] size-4" aria-hidden="true"></span>
			Copied!
		</span>
	</span>
</ActionButton>
