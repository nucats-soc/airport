<script>
    import Container from "$lib/components/container/Container.svelte";
    import LinkButton from "$lib/components/button/LinkButton.svelte";
    import Card from "$lib/components/card/Card.svelte";
</script>

<Container>
    <div class="flex flex-col justify-center">
        <div class="flex flex-col justify-center mb-4">
            <h2 class="text-2xl font-semibold">Our Socials</h2>
            <p>We are active on various social media platforms!</p>
        </div>
        <div class="flex gap-4">
            <Card padding="lg">
                <h2 class="flex items-center gap-3 text-2xl font-semibold">
                    <span class="icon-[simple-icons--discord] text-3xl"></span>
                    Discord
                </h2>
                <p>We have a Discord server where different members of the society can play games, talk to one another, and receive updates about upcoming events.</p>

                {#snippet footer()}
                    <LinkButton isExternal type="secondary" href="https://discord.gg/N4dJQdafrd" extraClass="w-full">Join Server</LinkButton>
                {/snippet}
            </Card>

            <Card padding="lg">
                <h2 class="flex items-center gap-3 text-2xl font-semibold">
                    <span class="icon-[simple-icons--github] text-3xl"></span>
                    GitHub
                </h2>
                <p>The source code for various projects developed by the society can be found on our GitHub, including this very website.</p>

                {#snippet footer()}
                    <LinkButton isExternal type="secondary" href="https://github.com/nucats" extraClass="w-full">View GitHub</LinkButton>
                {/snippet}
            </Card>

            <Card padding="lg">
                <h2 class="flex items-center gap-3 text-2xl font-semibold">
                    <span class="icon-[simple-icons--instagram] text-3xl"></span>
                    Instagram
                </h2>
                <p>Check out our Instagram for more updates on upcoming events, along with other content.</p>

                {#snippet footer()}
                    <LinkButton isExternal type="secondary" href="https://instagram.com/nucats_" extraClass="w-full">Follow Us</LinkButton>
                {/snippet}
            </Card>
        </div>
    </div>
</Container>
