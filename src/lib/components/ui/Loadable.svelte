<script lang="ts">
	import type { Snippet } from 'svelte';
	import Spinner from './Spinner.svelte';

	interface LoadableState {
		loading: boolean;
		error?: unknown;
	}

	interface Props {
		children?: Snippet;
		state?: LoadableState;
		loadingLabel?: string;
		errorMessage?: string;
		extraClass?: string;
	}

	let {
		children,
		state,
		loadingLabel = 'Loading',
		errorMessage = 'Something went wrong.',
		extraClass
	}: Props = $props();
</script>

{#if !state || state.loading}
	<Spinner label={loadingLabel} {extraClass} />
{:else if state.error}
	<p class="tx-body">{errorMessage}</p>
{:else if children}
	{@render children()}
{/if}
