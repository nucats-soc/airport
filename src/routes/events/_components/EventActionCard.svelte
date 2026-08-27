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
		iconClass?: string;
	}

	let {
		title,
		description,
		icon,
		actionIcon,
		actionLabel,
		href,
		isExternal = false,
		layout = 'card',
		iconClass = 'text-green-300'
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
			<div class="min-w-0 flex-1">
				<Cluster gap="sm">
					<Icon {icon} extraClass={iconClass} />
					<p class="tx-card-title">{title}</p>
				</Cluster>
				<p class="tx-body mt-3 text-zinc-300">{description}</p>
			</div>
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
