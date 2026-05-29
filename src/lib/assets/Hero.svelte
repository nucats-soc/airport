<script>
    import Container from "$lib/assets/Container.svelte";
    import Button from "$lib/assets/Button.svelte";

    let { title, subtext, description, image } = $props();
</script>

<Container>
    <div class="flex-1 flex flex-col justify-center">
        <div class="flex items-baseline gap-2 mb-2">
            <h1 class="text-4xl font-bold">{title}</h1> <p class="text-bold text-xl text-gray-400">{subtext}</p>
        </div>
        <p class="mb-4">{description}</p>
        <div class="gap-4 flex">
            <Button value="Get Involved!" isGreen onclick={() => window.open("https://nusu.co.uk/activities/view-society/131")} />
            <Button value="Join our Discord!" isLinkButton onclick={() => window.open("https://discord.gg/N4dJQdafrd")} />
        </div>
    </div>
    <div class="flex-1 flex justify-end">
        <img src={image} alt="NuCats Logo" class="w-[256px] h-64" />
    </div>
</Container>