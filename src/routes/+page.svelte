<script lang="ts">
	import Hero from './_components/Hero.svelte';
	import ImageCarousel from '$lib/components/carousel/ImageCarousel.svelte';
	import Socials from './_components/Socials.svelte';
	import About from './_components/About.svelte';

	import EventsOverview from './_components/EventsOverview.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Hero />
<ImageCarousel />
<About />
<Socials />
<EventsOverview events={data.events} />
