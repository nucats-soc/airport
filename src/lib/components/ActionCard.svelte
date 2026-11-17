<script lang="ts">
	import LinkButton from '#lib/components/button/LinkButton.svelte';

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

<div
	class={[
		'box flex flex-col items-stretch justify-between gap-sm p-lg',
		!stacked && 'lg:flex-row lg:items-center lg:gap-lg'
	]}
>
	<div class="flex min-w-0 flex-1 flex-col gap-sm">
		<div class="row gap-sm">
			<span class={[icon, iconClass, 'size-6 shrink-0']} aria-hidden="true"></span>
			<p class="tx-header-3 text-xl font-semibold">{title}</p>
		</div>
		<p class="tx-base text-zinc-300">{description}</p>
	</div>
	<LinkButton
		type="primary"
		href={buttonHref}
		external={buttonExternal}
		class={['w-full', !stacked && 'lg:w-auto lg:shrink-0']}
	>
		{#if buttonIcon}
			<span class={[buttonIcon, 'size-6 shrink-0']} aria-hidden="true"></span>
		{/if}
		{buttonLabel}
	</LinkButton>
</div>
