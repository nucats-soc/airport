<script lang="ts">
    import Container from '$lib/components/layout/Container.svelte';
    import Box from '$lib/components/layout/Box.svelte';
    import LinkButton from '$lib/components/ui/LinkButton.svelte';

    import headerImage from '$lib/assets/headers/events.jpg';
</script>

<Container extraClass="py-8">
    <Box extraClass="relative overflow-hidden">
        <img src={headerImage} alt="NUCATS members socialising" class="absolute inset-0 size-full object-cover" />
        <div class="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
        <div class="relative flex min-h-56 items-center p-4 sm:p-8">
            <div class="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
                <div class="max-w-3xl">
                    <h2 class="tx-page-title">What are you waiting for?</h2>
                    <p class="tx-tagline">
                        Join NUCATS today! Hang out with similar minded people, attend socials, build projects,
                        and most of all, have fun!
                    </p>
                </div>

                <div class="flex w-full lg:w-auto lg:justify-end">
                    <LinkButton
                        type="primary"
                        isExternal
                        href="https://nusu.co.uk/activities/view-society/131"
                        extraClass="w-full px-8 py-4 text-lg shadow-none sm:w-auto lg:min-w-44"
                    >
                        Join Today!
                    </LinkButton>
                </div>
            </div>
        </div>
    </Box>
</Container>