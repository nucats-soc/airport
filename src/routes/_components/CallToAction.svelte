<script lang="ts">
    import Container from '$lib/components/layout/Container.svelte';
    import headerImage from '$lib/assets/headers/events.jpg';
	import CallToActionBanner from '$lib/components/ui/CallToActionBanner.svelte';
</script>

<Container extraClass="py-8">
    <CallToActionBanner
		image={headerImage}
		alt="NUCATS members socialising"
		title="What are you waiting for?"
		description="Join NUCATS today! Hang out with similar minded people, attend socials, build projects, and most of all, have fun!"
		buttonLabel="Join Today!"
		buttonHref="https://nusu.co.uk/activities/view-society/131"
    />
</Container>