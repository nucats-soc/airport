<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { type ButtonProps, getButtonClasses } from './button.ts';

	type Props = ButtonProps & Omit<HTMLButtonAttributes, keyof ButtonProps>;

	let { type, shape, fill, between, class: className, children, ...rest }: Props = $props();
</script>

<button
	type="button"
	class={[getButtonClasses({ type, shape, fill, between }), className]}
	{...rest}
>
	{@render children?.()}
</button>
