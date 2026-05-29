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
        <div class="gap-4 flex">
            <Card title='<span class="icon-[lineicons--discord]"></span> Discord' description="We have a Discord server where different members of the society can play games, talk to one another, and receive updates about upcoming events." buttonText="Join Server" buttonLink="https://discord.gg/N4dJQdafrd" />
            <Card title='<span class="icon-[prime--github]"></span> GitHub' description="The source code for various projects developed by the society can be found on our GitHub, including this very website." buttonText="View on GitHub" buttonLink="https://github.com/nucats" />
            <Card title='<span class="icon-[prime--instagram]"></span> Instagram' description="Check out our Instagram for more updates on upcoming events, along with other content. " buttonText="Follow Us" buttonLink="https://instagram.com/nucats_" />
        </div>
    </div>
</Container>