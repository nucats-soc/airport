<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';

	interface Props {
		image: string;
		alt: string;
		title: string;
		description: string;
		buttonLabel: string;
		buttonHref: string;
		buttonExternal?: boolean;
	}

	let {
		image,
		alt,
		title,
		description,
		buttonLabel,
		buttonHref,
		buttonExternal = true
	}: Props = $props();
</script>

<Box extraClass="relative overflow-hidden">
	<img src={image} alt={alt} class="absolute inset-0 size-full object-cover" />
	<div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
	<div class="relative flex min-h-56 items-center p-4 sm:p-8">
		<div class="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
			<div class="max-w-3xl">
				<h2 class="tx-page-title">{title}</h2>
				<p class="tx-tagline">{description}</p>
			</div>

			<div class="flex w-full lg:w-auto lg:justify-end">
				<LinkButton
					type="primary"
					isExternal={buttonExternal}
					href={buttonHref}
					extraClass="w-full px-8 py-4 text-lg shadow-none sm:w-auto lg:min-w-44"
				>
					{buttonLabel}
				</LinkButton>
			</div>
		</div>
	</div>
</Box>