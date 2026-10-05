<script lang="ts">
	import { type ButtonProps, getButtonClasses } from './button.ts';

	type Props = ButtonProps & {
		onclick: () => void;
	};

	let { onclick, ...buttonProps }: Props = $props();

	let classes = $derived(getButtonClasses(buttonProps));
</script>

<button {onclick} class={classes}>
	{@render buttonProps.children?.()}
</button>
