<script lang="ts">
    import Container from '$lib/components/layout/Container.svelte';
    import Card from '$lib/components/card/Card.svelte';
    import LinkButton from "$lib/components/button/LinkButton.svelte";

    interface Event {
        name: string;
        date: string;
        description: string;
        location: string;
        icon: string;
        colour: string;
        href: string;
    }

    const events: Event[] = [
        {
            name: 'Two Arrows Event',
            date: 'Today at 3:30pm',
            description:
                'Tempora blanditiis facilis sed et dicta est. Libero amet sit et. Ea rem veritatis tempore qui ipsum. Fugiat nemo numquam minus architecto asperiores. Est est sapiente est quidem nesciunt consequatur amet.',
            location: 'USB 3.015',
            icon: 'icon-[material-symbols--swap-calls]',
            colour: '#ff2d3d',
            href: '/events'
        },
        {
            name: 'Circle Event',
            date: 'Tomorrow at 7:30pm',
            description:
                'Tempora blanditiis facilis sed et dicta est. Libero amet sit et. Ea rem veritatis tempore qui ipsum. Fugiat nemo numquam minus architecto asperiores. Est est sapiente est quidem nesciunt consequatur amet.',
            location: 'USB 3.015',
            icon: 'icon-[material-symbols--circle]',
            colour: '#5c5cf6',
            href: '/events'
        },
        {
            name: 'Elections',
            date: 'Next Monday at 3:30pm',
            description:
                'Tempora blanditiis facilis sed et dicta est. Libero amet sit et. Ea rem veritatis tempore qui ipsum. Fugiat nemo numquam minus architecto asperiores. Est est sapiente est quidem nesciunt consequatur amet.',
            location: 'USB 3.015',
            icon: 'icon-[material-symbols--how-to-vote-outline]',
            colour: '#00ae45',
            href: '/events'
        }
    ];
</script>

<Container>
    <section aria-labelledby="upcoming-events-title">
        <h2 class="tx-section-title">Upcoming Events</h2>
        <p class="tx-body">There are three events happening in the next week.</p>

        <div class="mt-4 flex flex-col gap-3">
            {#each events as event}
                <Card type="horizontal" padding="sm" extraClass="min-h-35">
                    {#snippet thumbnail()}
                        <div class="flex h-full w-full flex-col items-center justify-center px-6 py-5 text-center md:w-70"
                             style:background-color={event.colour}>
                            <span class={[event.icon, 'mb-2 size-8']} aria-hidden="true"></span>
                            <h3 class="tx-item-title">{event.name}</h3>
                            <p class="tx-body">{event.date}</p>
                        </div>
                    {/snippet}

                    <p class="tx-body">{event.description}</p>

                    {#snippet footer()}
                        <div class="flex w-full flex-wrap items-center justify-between gap-4">
                            <div class="flex items-center gap-2">
                                <span class="icon-[material-symbols--location-on] size-5 shrink-0"
                                        aria-hidden="true"></span>
                                <span class="text-body">{event.location}</span>
                            </div>

                            <LinkButton href="/events" type="secondary">Read More</LinkButton>
                        </div>
                    {/snippet}
                </Card>
            {/each}
        </div>
    </section>
</Container>
