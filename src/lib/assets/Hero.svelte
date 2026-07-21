<script>
    import Container from "$lib/components/container/Container.svelte";
    import LinkButton from "$lib/components/button/LinkButton.svelte";

    let { title, subtext, description, image } = $props();
</script>

<section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 animate-drift bg-[url('/bg-patt.svg')] bg-repeat opacity-2"></div>
    <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#18181b] to-transparent"></div>
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-[#18181b]"></div>

    <div class="relative">
        <Container>
            <div class="flex gap-4 py-16">
                <div class="flex flex-1 flex-col justify-center">
                    <div class="mb-2 flex items-baseline gap-2">
                        <h1 class="text-2xl leading-5 font-bold">{title}</h1>
                        <p class="text-bold text-xl text-gray-400">{subtext}</p>
                    </div>
                    <p class="mb-4">{description}</p>
                    <div class="flex gap-4">
                        <LinkButton isExternal type="primary" href="https://nusu.co.uk/activities/view-society/131">Get Involved!</LinkButton>
                        <LinkButton isExternal type="secondary" href="https://discord.gg/N4dJQdafrd">Join our Discord!</LinkButton>
                    </div>
                </div>
                <div class="flex flex-1 justify-end">
                    <img src={image} alt="NuCats Logo" class="h-64 w-[256px]" />
                </div>
            </div>
        </Container>
    </div>
</section>
