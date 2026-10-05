<script lang="ts">
	import { type ButtonProps, getButtonClasses } from './button.ts';
	import ExternalArrow from '#lib/components/icon/ExternalArrow.svelte';

	type Props = ButtonProps & {
		href: string;
		external?: boolean;
		openInNewTab?: boolean;
	};

	let { href, external = false, openInNewTab = false, ...buttonProps }: Props = $props();

	let shouldOpenInNewTab = $derived(openInNewTab ?? external ?? false);
	let target = $derived(shouldOpenInNewTab ? '_blank' : '_self');
	let rel = $derived(shouldOpenInNewTab ? 'noopener noreferrer' : undefined);
	let classes = $derived(getButtonClasses(buttonProps));
</script>

<a class={classes} {href} {target} {rel}>
	{@render buttonProps.children?.()}
	{#if external}
		<ExternalArrow />
	{/if}
</a>
