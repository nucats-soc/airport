<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SplitLayout from '$lib/components/layout/SplitLayout.svelte';
	import type { PageProps } from './$types';
	import EventHeader from './_components/EventHeader.svelte';
	import EventVenue from './_components/EventVenue.svelte';
	import EventInformation from './_components/EventInformation.svelte';

	let { data }: PageProps = $props();
	let event = $derived(data.event);
</script>

<Container>
	<div class="flex flex-col gap-8 py-8 lg:py-12">
		<EventHeader {event} />
		{#if event.location}
			<SplitLayout ratio="left-wide" extraClass="items-start">
				{#snippet left()}
					<div class="flex flex-col gap-8">
						<EventInformation {event} />
						<article class="prose w-full max-w-none prose-invert">
							{@html data.contentHtml}
						</article>
					</div>
				{/snippet}
				{#snippet right()}
					{#if event.location}
						<EventVenue event={{ ...event, location: event.location }} />
					{/if}
				{/snippet}
			</SplitLayout>
		{:else}
			<div class="flex flex-col gap-8">
				<EventInformation {event} />
				<article class="prose w-full max-w-none prose-invert">
					{@html data.contentHtml}
				</article>
			</div>
		{/if}
	</div>
</Container>
