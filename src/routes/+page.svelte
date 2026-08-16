<script lang="ts">
	import Hero from '$lib/sections/Hero.svelte';
    import ImageCarousel from "$lib/components/carousel/ImageCarousel.svelte";
    import Socials from '$lib/sections/Socials.svelte';
    import About from '$lib/sections/About.svelte';

	import EventsOverview from '$lib/sections/EventsOverview.svelte';
    import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<Hero />
<ImageCarousel />
<About />
<Socials />
<EventsOverview events={data.events} />
