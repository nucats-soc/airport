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
	import { getEvent } from './event.remote';

	let { params }: PageProps = $props();
	let eventQuery = $derived(browser ? getEvent(params.id) : undefined);
	let eventData = $derived(eventQuery?.current);
</script>

<Container>
	<Stack gap="lg">
		<LinkButton type="subtle" href="/events" extraClass="self-start">
			<Icon icon="icon-[material-symbols--arrow-back]" size="sm" />
			Back to events
		</LinkButton>
		<Loadable
			state={eventQuery}
			loadingLabel="Loading event"
			errorMessage="Event could not be loaded."
			extraClass="w-full py-8"
		>
			{#if eventData}
				<EventHeader event={eventData.event} />
				{#if eventData.event.location}
					<SplitLayout ratio="left-wide" extraClass="items-start">
						{#snippet left()}
							<Stack gap="lg">
								<EventInformation event={eventData.event} />
								<article class="prose w-full max-w-none prose-invert">
									{@html eventData.contentHtml}
								</article>
							</Stack>
						{/snippet}
						{#snippet right()}
							{#if eventData.event.location}
								<EventVenue event={{ ...eventData.event, location: eventData.event.location }} />
							{/if}
						{/snippet}
					</SplitLayout>
				{:else}
					<Stack gap="lg">
						<EventInformation event={eventData.event} />
						<article class="prose w-full max-w-none prose-invert">
							{@html eventData.contentHtml}
						</article>
					</Stack>
				{/if}
			{/if}
		</Loadable>
	</Stack>
</Container>
