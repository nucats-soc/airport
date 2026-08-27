<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
		extraClass?: string;
	}

	let { children, extraClass }: Props = $props();

	let outerClasses = $derived(classNames('w-full px-4 sm:px-8', extraClass));
</script>

<div class={outerClasses}>
	<div class="mx-auto w-full max-w-225">
		{#if children}
			{@render children()}
		{/if}
	</div>
</div>
