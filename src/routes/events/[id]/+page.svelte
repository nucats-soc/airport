<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import SplitLayout from '$lib/components/layout/SplitLayout.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import type { PageProps } from './$types';
	import EventHeader from './_components/EventHeader.svelte';
	import EventVenue from './_components/EventVenue.svelte';
	import EventInformation from './_components/EventInformation.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	let { data }: PageProps = $props();
	let event = $derived(data.event);
</script>

<Container>
	<Stack gap="lg">
		<LinkButton type="subtle" href="/events" extraClass="self-start">
			<Icon icon="icon-[material-symbols--arrow-back]" size="sm" />
			Back to events
		</LinkButton>
		<EventHeader {event} />
		{#if event.location}
			<SplitLayout ratio="left-wide" extraClass="items-start">
				{#snippet left()}
					<Stack gap="lg">
						<EventInformation {event} />
						<article class="prose w-full max-w-none prose-invert">
							{@html data.contentHtml}
						</article>
					</Stack>
				{/snippet}
				{#snippet right()}
					{#if event.location}
						<EventVenue event={{ ...event, location: event.location }} />
					{/if}
				{/snippet}
			</SplitLayout>
		{:else}
			<Stack gap="lg">
				<EventInformation {event} />
				<article class="prose w-full max-w-none prose-invert">
					{@html data.contentHtml}
				</article>
			</Stack>
		{/if}
	</Stack>
</Container>
