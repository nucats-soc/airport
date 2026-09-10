<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';

	interface Props {
		icon: string;
		iconClass?: string;
		title: string;
		description: string;
		buttonIcon?: string;
		buttonLabel: string;
		buttonHref: string;
		buttonExternal?: boolean;
		stacked?: boolean;
	}

	let {
		icon,
		iconClass,
		title,
		description,
		buttonIcon,
		buttonLabel,
		buttonHref,
		buttonExternal = false,
		stacked = false
	}: Props = $props();
</script>

<Box background="card">
	<Inset space="lg">
		<div
			class={[
				'flex flex-col items-stretch justify-between gap-4',
				!stacked && 'lg:flex-row lg:items-center lg:gap-8'
			]}
		>
			<Stack gap="sm" extraClass="min-w-0 w-full flex-1">
				<Cluster gap="sm">
					<Icon {icon} extraClass={iconClass} />
					<p class="tx-card-title">{title}</p>
				</Cluster>
				<p class="tx-body text-zinc-300">{description}</p>
			</Stack>
			<LinkButton
				type="primary"
				href={buttonHref}
				isExternal={buttonExternal}
				extraClass={stacked ? 'w-full' : 'w-full lg:w-auto lg:shrink-0'}
			>
				{#if buttonIcon}
					<Icon icon={buttonIcon} />
				{/if}
				{buttonLabel}
			</LinkButton>
		</div>
	</Inset>
</Box>
