<script lang="ts">
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import { type ButtonProps, getButtonClasses } from './button.ts';
	import ExternalArrow from '#lib/components/icon/ExternalArrow.svelte';

	type Props = ButtonProps &
		Omit<HTMLAnchorAttributes, keyof ButtonProps> & {
			href: string;
			external?: boolean;
			openInNewTab?: boolean;
		};

	let {
		type,
		shape,
		fill,
		between,
		class: className,
		children,
		external = false,
		openInNewTab = external,
		...rest
	}: Props = $props();
</script>

<a
	class={[getButtonClasses({ type, shape, fill, between }), className]}
	target={openInNewTab ? '_blank' : undefined}
	rel={openInNewTab ? 'noopener noreferrer' : undefined}
	{...rest}
>
	{@render children?.()}
	{#if external}
		<ExternalArrow />
	{/if}
</a>
