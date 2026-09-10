<script lang="ts">
	import { browser } from '$app/environment';
	import Container from '$lib/components/layout/Container.svelte';
	import SplitLayout from '$lib/components/layout/SplitLayout.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Loadable from '$lib/components/ui/Loadable.svelte';
	import type { PageProps } from './$types';
	import EventHeader from './_components/EventHeader.svelte';
	import EventVenue from './_components/EventVenue.svelte';
	import EventInformation from './_components/EventInformation.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import { getEventDescription } from './event.remote';
	import PageMetadata from '$lib/components/PageMetadata.svelte';
	import { EVENT_HEX_COLORS } from '$lib/util/event';

	let { data, params }: PageProps = $props();
	let eventDescriptionQuery = $derived(browser ? getEventDescription(params.id) : undefined);
	let eventDescription = $derived(eventDescriptionQuery?.current?.contentHtml);
</script>

<PageMetadata
	title={data.eventMetadata.name}
	description={data.eventMetadata.description ?? `Event details for ${data.eventMetadata.name}.`}
	image={`/events/${params.id}/icon.png?v=${data.eventMetadata.lastEditedAt.getTime()}`}
	color={EVENT_HEX_COLORS[data.eventMetadata.color]}
	updatedAt={data.eventMetadata.lastEditedAt}
	index={false}
/>

{#snippet description()}
	<Loadable
		state={eventDescriptionQuery}
		loadingLabel="Loading event description"
		errorMessage="Event description could not be loaded."
		extraClass="w-full py-8"
	>
		{#if eventDescription}
			<article class="prose w-full max-w-none prose-invert">
				{@html eventDescription}
			</article>
		{/if}
	</Loadable>
{/snippet}

<Container>
	<Stack gap="lg">
		<LinkButton type="subtle" href="/events" extraClass="self-start">
			<Icon icon="icon-[material-symbols--arrow-back]" size="sm" />
			Back to events
		</LinkButton>
		<EventHeader event={data.eventMetadata} />
		{#if data.eventMetadata.location}
			<SplitLayout ratio="left-wide" extraClass="items-start">
				{#snippet left()}
					<Stack gap="lg">
						<EventInformation event={data.eventMetadata} />
						{@render description()}
					</Stack>
				{/snippet}
				{#snippet right()}
					{#if data.eventMetadata.location}
						<EventVenue event={{ ...data.eventMetadata, location: data.eventMetadata.location }} />
					{/if}
				{/snippet}
			</SplitLayout>
		{:else}
			<Stack gap="lg">
				<EventInformation event={data.eventMetadata} />
				{@render description()}
			</Stack>
		{/if}
	</Stack>
</Container>
