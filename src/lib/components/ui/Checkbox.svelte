<script lang="ts">
	import classNames from 'classnames';
	import type { Snippet } from 'svelte';
	import Icon from './Icon.svelte';

	interface Props {
		checked: boolean;
		onChange: () => void;
		children: Snippet;
	}

	let { checked, onChange, children }: Props = $props();

	let labelClassNames = classNames(
		'group tx-body flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5',
		'transition-colors hover:bg-zinc-600'
	);
	let checkboxClassNames = $derived(
		classNames(
			'flex size-5 shrink-0 items-center justify-center rounded-lg text-white',
			'transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-brand-light',
			'peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-zinc-700',
			checked ? 'bg-brand' : 'bg-zinc-900'
		)
	);
</script>

<label class={labelClassNames}>
	<input type="checkbox" {checked} onchange={onChange} class="peer sr-only" />
	<span class={checkboxClassNames} aria-hidden="true">
		{#if checked}
			<Icon icon="icon-[material-symbols--check]" size="sm" />
		{/if}
	</span>
	{@render children()}
</label>
