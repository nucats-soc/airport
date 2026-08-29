<script lang="ts">
	import classNames from 'classnames';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Icon from './Icon.svelte';

	export interface SelectorOption {
		value: string;
		label: string;
		icon?: string;
		disabled?: boolean;
	}

	interface Props {
		options: SelectorOption[];
		value: string;
		ariaLabel?: string;
		extraClass?: string;
	}

	let {
		options,
		value = $bindable(),
		ariaLabel = 'Select an option',
		extraClass
	}: Props = $props();
</script>

<Box background="card" {extraClass}>
	<Inset space="sm">
		<div role="group" aria-label={ariaLabel}>
			<Cluster gap="md" justify="between" collapse extraClass="w-full">
				{#each options as option (option.value)}
					<button
						type="button"
						aria-pressed={value === option.value}
						disabled={option.disabled}
						onclick={() => (value = option.value)}
						class={classNames(
							'tx-item-title flex w-full items-center justify-center gap-4 rounded-lg p-4 transition-colors duration-200',
							value === option.value && 'bg-zinc-700 text-indigo-300',
							option.disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:bg-zinc-700'
						)}
					>
						{#if option.icon}
							<Icon icon={option.icon} size="sm" />
						{/if}
						{option.label}
					</button>
				{/each}
			</Cluster>
		</div>
	</Inset>
</Box>
