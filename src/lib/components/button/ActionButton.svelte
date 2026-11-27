<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { type ButtonProps, getButtonClasses } from './button.ts';

	type Props = ButtonProps & Omit<HTMLButtonAttributes, keyof ButtonProps>;

	let {
		variant,
		shape,
		fill,
		between,
		type = 'button',
		class: className,
		children,
		...rest
	}: Props = $props();
</script>

<button {type} class={[getButtonClasses({ variant, shape, fill, between }), className]} {...rest}>
	{@render children?.()}
</button>
