<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type ButtonVariant, getButtonStyle } from './button';
	import Icon from './Icon.svelte';

	type Props = {
		children: Snippet;
		type: ButtonVariant;
		href: string;
		isExternal?: boolean;
		openInNewTab?: boolean;
		extraClass?: string;
		isDisabled?: boolean;
	};

	let { children, type, extraClass, isDisabled, href, isExternal, openInNewTab }: Props = $props();

	let shouldOpenInNewTab = $derived(openInNewTab ?? isExternal ?? false);
	let target = $derived(shouldOpenInNewTab ? '_blank' : '_self');
	let rel = $derived(shouldOpenInNewTab ? 'noopener noreferrer' : undefined);
	let classNames = $derived(getButtonStyle(type, isDisabled, extraClass));
</script>

<a href={isDisabled ? undefined : href} {target} {rel} class={classNames}>
	{@render children()}
	{#if isExternal}
		<span class="size-4 shrink-0 overflow-hidden">
			<Icon
				icon="icon-[material-symbols--arrow-outward]"
				size="sm"
				extraClass="external-arrow block"
			/>
		</span>
	{/if}
</a>

<style>
	@keyframes wrap-arrow {
		0% {
			transform: translate(0) scale(100%);
		}
		49% {
			transform: translate(100%, -100%) scale(25%);
		}
		50% {
			transform: translate(-100%, 100%) scale(25%);
		}
		100% {
			transform: translate(0) scale(100%);
		}
	}

	a:hover :global(.external-arrow) {
		animation: wrap-arrow 300ms cubic-bezier(0.45, 0, 0.55, 1);
	}

	@media (prefers-reduced-motion: reduce) {
		a:hover :global(.external-arrow) {
			animation: none;
		}
	}
</style>
