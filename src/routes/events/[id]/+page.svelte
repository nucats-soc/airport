<script lang="ts">
	import { getHref } from '#lib/links.js';
	import LinkButton from '#lib/components/button/LinkButton.svelte';
	import PageMetadata from '#lib/components/PageMetadata.svelte';
	import Spinner from '#lib/components/Spinner.svelte';
	import { EVENT_HEX_COLORS } from '#lib/util/event.js';
	import type { PageProps } from './$types';
	import EventHeader from './_components/EventHeader.svelte';
	import EventInformation from './_components/EventInformation.svelte';
	import EventVenue from './_components/EventVenue.svelte';
	import { getEventDescription } from './event.remote';

	let { data, params }: PageProps = $props();

	let event = $derived(data.eventMetadata);
</script>

<PageMetadata
	title={event.name}
	description={event.description ?? `Event details for ${event.name}.`}
	image={`/events/${params.id}/icon.png?v=${event.lastEditedAt.getTime()}`}
	color={EVENT_HEX_COLORS[event.color]}
	updatedAt={event.lastEditedAt}
	index={false}
/>

{#snippet details()}
	<div class="flex flex-col gap-lg">
		<EventInformation {event} />
		<svelte:boundary>
			<article class="prose w-full max-w-none prose-invert">
				{@html (await getEventDescription(params.id)).contentHtml}
			</article>

			{#snippet pending()}
				<Spinner label="Loading event description" class="w-full py-8" />
			{/snippet}

			{#snippet failed()}
				<p class="tx-base py-8">Event description could not be loaded.</p>
			{/snippet}
		</svelte:boundary>
	</div>
{/snippet}

<div class="page-container flex flex-col gap-lg">
	<LinkButton variant="ghost" href={getHref('events')}>
		<span class="icon-[material-symbols--arrow-back] size-4" aria-hidden="true"></span>
		Back to events
	</LinkButton>
	<EventHeader {event} />
	{#if event.location}
		<div class="split-layout split-layout-left-wide items-start">
			{@render details()}
			<div>
				<EventVenue event={{ ...event, location: event.location }} />
			</div>
		</div>
	{:else}
		{@render details()}
	{/if}
</div>
