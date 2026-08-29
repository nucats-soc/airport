<script lang="ts">
	import { browser } from '$app/environment';
	import Loadable from '$lib/components/ui/Loadable.svelte';
	import Hero from './_components/Hero.svelte';
	import ImageCarousel from './_components/ImageCarousel.svelte';
	import Socials from './_components/Socials.svelte';
	import About from './_components/About.svelte';
	import EventsOverview from './_components/EventsOverview.svelte';
	import { getUpcomingEventsPreview } from './home.remote';

	let eventsQuery = $derived(browser ? getUpcomingEventsPreview() : undefined);
	let events = $derived(eventsQuery?.current ?? []);
</script>

<Hero />
<ImageCarousel />
<About />
<Socials />
<Loadable
	state={eventsQuery}
	loadingLabel="Loading upcoming events"
	errorMessage="Upcoming events could not be loaded."
	extraClass="w-full py-8"
>
	<EventsOverview {events} />
</Loadable>
