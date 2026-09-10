<script lang="ts">
	import { page } from '$app/state';

	type Props = {
		title: string;
		description: string;
		image?: string;
		color?: string;
		updatedAt?: Date | string;
		index?: boolean;
	};

	let {
		title,
		description,
		image = '/og-image.png',
		color = '#1769B3',
		updatedAt,
		index = true
	}: Props = $props();

	let fullTitle = $derived(title === 'NUCATS' ? title : `${title} - NUCATS`);
	let canonicalUrl = $derived(new URL(page.url.pathname, page.url.origin).href);
	let imageUrl = $derived(new URL(image, page.url.origin).href);
	let updatedAtIso = $derived(updatedAt ? new Date(updatedAt).toISOString() : undefined);
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	{#if index}
		<meta name="robots" content="index, follow" />
	{:else}
		<meta name="robots" content="noindex, follow" />
	{/if}
	<meta name="theme-color" content={color} />

	<link rel="canonical" href={canonicalUrl} />
	<link rel="icon" href="/favicon.ico" />

	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:site_name" content="NUCATS" />
	<meta property="og:locale" content="en_GB" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:image:alt" content={fullTitle} />
	{#if updatedAtIso}
		<meta property="og:updated_time" content={updatedAtIso} />
	{/if}

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
	<meta name="twitter:image:alt" content={fullTitle} />
</svelte:head>
