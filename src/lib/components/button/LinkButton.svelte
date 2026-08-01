<script lang="ts">
	import type { Snippet } from 'svelte';
	import { type ButtonVariant, getButtonStyle } from './button';

	type Props = {
		children?: Snippet;
		type: ButtonVariant;
		href: string;
		isExternal?: boolean;
		extraClass?: string;
		isDisabled?: boolean;
	};

	let { children, type, extraClass, isDisabled, href, isExternal }: Props = $props();

	let target = $derived(isExternal ? '_blank' : '_self');
	let rel = $derived(isExternal ? 'noopener noreferrer' : undefined);
	let classNames = $derived(getButtonStyle(type, isDisabled, extraClass));
</script>

<a href={isDisabled ? undefined : href} {target} {rel} class={classNames}>
	{#if children}
		{@render children()}
	{/if}
	{#if isExternal && type != 'icon'}
		<span class="size-4 shrink-0 overflow-hidden" aria-hidden="true">
			<span class="external-arrow icon-[material-symbols--arrow-outward] block size-4"></span>
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

	a:hover .external-arrow {
		animation: wrap-arrow 300ms cubic-bezier(0.45, 0, 0.55, 1);
	}

	@media (prefers-reduced-motion: reduce) {
		a:hover .external-arrow {
			animation: none;
		}
	}
</style>
