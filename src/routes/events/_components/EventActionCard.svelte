<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';

	interface Props {
		title: string;
		description: string;
		icon: string;
		actionIcon: string;
		actionLabel: string;
		href: string;
		isExternal?: boolean;
		layout?: 'card' | 'responsive-banner';
	}

	let {
		title,
		description,
		icon,
		actionIcon,
		actionLabel,
		href,
		isExternal = false,
		layout = 'card'
	}: Props = $props();
</script>

<Box background="card">
	<Inset space="lg">
		<div
			class={[
				'flex flex-col gap-4',
				layout === 'responsive-banner' && 'lg:flex-row lg:items-center lg:justify-between lg:gap-8'
			]}
		>
			{#if layout === 'responsive-banner'}
				<div class="flex min-w-0 flex-1 items-center gap-4">
					<Inset space="sm" extraClass="shrink-0">
						<Icon {icon} size="lg" extraClass="text-green-300" />
					</Inset>
					<div class="min-w-0">
						<p class="tx-card-title">{title}</p>
						<p class="tx-body mt-2 text-zinc-300">{description}</p>
					</div>
				</div>
			{:else}
				<div class="flex min-w-0 flex-1 flex-col gap-4">
					<Cluster gap="sm">
						<Icon {icon} />
						<p class="tx-card-title">{title}</p>
					</Cluster>
					<p class="tx-body text-zinc-300">{description}</p>
				</div>
			{/if}
			<LinkButton
				type="primary"
				{href}
				{isExternal}
				extraClass={layout === 'responsive-banner' ? 'w-full lg:w-auto lg:shrink-0' : 'w-full'}
			>
				<Icon icon={actionIcon} />
				{actionLabel}
			</LinkButton>
		</div>
	</Inset>
</Box>
