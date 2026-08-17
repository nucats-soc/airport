<script lang="ts">
	import ActionButton from '$lib/components/button/ActionButton.svelte';
	import { type ButtonVariant, getButtonStyle } from './button';
	import { onMount, type Snippet } from 'svelte';
	import classNames from 'classnames';

	type Props = {
		children?: Snippet;
		label: string;
		type: ButtonVariant;
		extraClass?: string;
	};

	let dropdownElement: HTMLDivElement;
	let { children, label, ...rest }: Props = $props();
	let open = $state(false);

	onMount(() => {
		function onDocumentClick(event: MouseEvent) {
			if (open && event.target instanceof Node && !dropdownElement.contains(event.target)) {
				open = false;
			}
		}

		document.addEventListener('click', onDocumentClick);

		return () => {
			document.removeEventListener('click', onDocumentClick);
		};
	});

	function onClick() {
		open = !open;
	}

	let dropdownClass = $derived(
		classNames('absolute top-full left-0 z-40 w-full', 'origin-top transition duration-250', {
			'scale-100 opacity-100 pointer-events-auto': open,
			'scale-95 opacity-0 pointer-events-none': !open
		})
	);

	let arrowClass = $derived(
		classNames('icon-[material-symbols--arrow-drop-down] block size-6', {
			'rotate-180': open
		})
	);
</script>

<div bind:this={dropdownElement} class="relative inline-block">
	<ActionButton {onClick} {...rest}>
		{label}

		<span class="size-6 shrink-0" aria-hidden="true">
			<span class={arrowClass}></span>
		</span>
	</ActionButton>

	{#if children}
		<div class={dropdownClass}>
			<div
				class="absolute top-0 left-1/2 z-50 mt-2 size-5 -translate-x-1/2 rotate-45 bg-zinc-700"
				aria-hidden="true"
			></div>

			<div class="mt-4 w-max min-w-full rounded-md bg-zinc-700 p-4 shadow-lg">
				{@render children()}
			</div>
		</div>
	{/if}
</div>
