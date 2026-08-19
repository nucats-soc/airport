<script lang="ts">
	import AnimatedCatBackground from '$lib/components/background/AnimatedCatBackground.svelte';
	import LinkButton from '$lib/components/button/LinkButton.svelte';
	import Card from '$lib/components/card/Card.svelte';
	import EventCard from '$lib/components/card/EventCard.svelte';
	import Container from '$lib/components/layout/Container.svelte';

	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	let eventSummary = $derived(
		data.events.length === 0
			? 'There are no upcoming events right now.'
			: data.events.length === 1
				? 'There is one upcoming event.'
				: `There are ${data.events.length} upcoming events.`
	);
</script>

<svelte:head>
	<title>Events | NUCATS</title>
	<meta
		name="description"
		content="See upcoming events from Newcastle University's Computing and Technology Society."
	/>
</svelte:head>

<AnimatedCatBackground>
	<Container>
		<header class="max-w-2xl py-4 lg:py-8">
			<h1 class="tx-page-title">Events Calendar</h1>
			<div class="prose prose-invert">
				<p>We run various events throughout the year ranging from pub meals to hackathons! There *should* be something for everyone to enjoy, however if there isn’t feel free to get in touch at committee@example.com.</p>
				<p>These events are also published to an iCal feed, which can be found by clicking here. If you are using Apple’s Calendar, the process should be straight forward and if you’re using Google Calendar, you can follow this tutorial.</p>
				<p>All events require an active membership unless otherwise specified.</p>
			</div>
		</header>
	</Container>
</AnimatedCatBackground>

<Container>
	{#if data.events.length < 0}
		<div class="flex flex-col gap-4">
			{#each data.events as event (event.id)}
				<EventCard {event} />
			{/each}
		</div>
	{:else}
		<Card padding="lg">
			<div class="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
					<span
							class="icon-[material-symbols--event-busy-outline] size-12 shrink-0 text-indigo-200"
							aria-hidden="true"
					></span>
				<div class="flex-1">
					<h3 class="tx-item-title">Nothing scheduled just yet</h3>
					<p class="tx-body mt-2 text-zinc-300">
						Join our Discord to hear about new socials, workshops, and meetups as soon as they
						are announced.
					</p>
				</div>
				<LinkButton isExternal type="secondary" href="https://discord.gg/N4dJQdafrd">
					Join Discord
				</LinkButton>
			</div>
		</Card>
	{/if}
</Container>
