<script lang="ts">
	import Hero from './_components/Hero.svelte';
	import ImageCarousel from './_components/ImageCarousel.svelte';
	import Socials from './_components/Socials.svelte';
	import About from './_components/About.svelte';
	import EventsOverview from './_components/EventsOverview.svelte';
	import Container from '$lib/components/layout/Container.svelte';
	import ActionCard from '$lib/components/ui/ActionCard.svelte';
	import PageMetadata from '$lib/components/PageMetadata.svelte';
</script>

<PageMetadata
	title="Home"
	description="Newcastle University's student-run society for computing students, or for anyone with an interest in tech!"
/>

<Hero />
<ImageCarousel />
<About />
<Socials />
<EventsOverview />
<Container extraClass="py-8">
	<ActionCard
		icon="icon-[material-symbols--groups]"
		iconClass="text-indigo-300"
		title="What are you waiting for?"
		description="Join NUCATS today! Hang out with similar minded people, attend socials, build projects, and most of all, have fun!"
		buttonIcon="icon-[material-symbols--person-add-outline]"
		buttonLabel="Join Today!"
		buttonHref="https://nusu.co.uk/activities/view-society/131"
		buttonExternal
	/>
</Container>
