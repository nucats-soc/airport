<script lang="ts">
	import type { ComponentProps } from 'svelte';
	import ActionButton from './ActionButton.svelte';

	type Props = Omit<ComponentProps<typeof ActionButton>, 'onclick'> & {
		value: string;
	};

	let { children, value, ...buttonProps }: Props = $props();

	let copied = $state(false);
	let resetTimer: ReturnType<typeof setTimeout> | undefined;

	async function copy() {
		await navigator.clipboard.writeText(value);

		copied = true;

		clearTimeout(resetTimer);
		resetTimer = setTimeout(() => (copied = false), 1500);
	}

	$effect(() => () => clearTimeout(resetTimer));

	const stateClasses =
		'col-start-1 row-start-1 flex items-center justify-center gap-xs transition motion-reduce:transition-none';
</script>

<ActionButton onclick={copy} {...buttonProps}>
	<span class="grid" aria-live="polite">
		<span class={[stateClasses, copied && 'scale-75 opacity-0']} aria-hidden={copied}>
			<span class="icon-[material-symbols--content-copy] size-4 shrink-0" aria-hidden="true"></span>
			{@render children?.()}
		</span>
		<span class={[stateClasses, !copied && 'scale-75 opacity-0']} aria-hidden={!copied}>
			<span class="icon-[material-symbols--check] size-4 shrink-0" aria-hidden="true"></span>
			Copied!
		</span>
	</span>
</ActionButton>
