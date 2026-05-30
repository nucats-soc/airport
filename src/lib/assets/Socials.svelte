<script>
    import Container from "$lib/assets/Container.svelte";
    import Button from "$lib/assets/Button.svelte";
    import Card from "$lib/assets/Card.svelte";
</script>

<Container>
    <div class="flex flex-col justify-center">
        <div class="flex flex-col justify-center mb-4">
            <h2 class="text-3xl font-bold">Our Socials</h2>
            <p>We are active on various social media platforms!</p>
        </div>
        <div class="flex gap-4">
            <Card padding="lg">
                <h2 class="flex items-center gap-3 text-2xl font-bold">
                    <span class="icon-[simple-icons--discord] text-3xl"></span>
                    Discord
                </h2>
                <p>We have a Discord server where different members of the society can play games, talk to one another, and receive updates about upcoming events.</p>

                {#snippet footer()}
                    <Button value="Join Server" type="secondary" isLinkButton onClick={() => window.open("https://discord.gg/N4dJQdafrd")} />
                {/snippet}
            </Card>

            <Card padding="lg">
                <h2 class="flex items-center gap-3 text-2xl font-bold">
                    <span class="icon-[simple-icons--github] text-3xl"></span>
                    GitHub
                </h2>
                <p>The source code for various projects developed by the society can be found on our GitHub, including this very website.</p>

                {#snippet footer()}
                    <Button value="View GitHub" type="secondary" isLinkButton onClick={() => window.open("https://github.com/nucats")} />
                {/snippet}
            </Card>

            <Card padding="lg">
                <h2 class="flex items-center gap-3 text-2xl font-bold">
                    <span class="icon-[simple-icons--instagram] text-3xl"></span>
                    Instagram
                </h2>
                <p>Check out our Instagram for more updates on upcoming events, along with other content.</p>

                {#snippet footer()}
                    <Button value="Follow Us" type="secondary" isLinkButton onClick={() => window.open("https://instagram.com/nucats_")} />
                {/snippet}
            </Card>
        </div>
    </div>
</Container>
