<script lang="ts">
    import Container from '$lib/components/layout/Container.svelte';
    import SplitLayout from '$lib/components/layout/SplitLayout.svelte';
    import LinkButton from '$lib/components/button/LinkButton.svelte';
</script>

<section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0 animate-drift bg-[url('/bg-patt.svg')] bg-repeat opacity-2"></div>
    <div class="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-[#18181b] to-transparent"></div>
    <div class="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-linear-to-b from-transparent to-[#18181b]"></div>

    <div class="relative">
        <Container>
            <SplitLayout class="layout-section">
                {#snippet left()}
                    <div class="flex flex-1 flex-col justify-center gap-4">
                       <div>
                           <div class="flex items-baseline gap-4">
                               <h1 class="text-2xl leading-5 font-bold">We are NUCATS!</h1>
                               <p class="text-bold text-xl text-gray-400">meow!</p>
                           </div>
                           <p>
                               Newcastle University’s Computing and Technology Society. We aim to provide a safe
                               community for Computer Science and non Computer Science students alike.
                           </p>
                       </div>
                        <div class="flex gap-4">
                            <LinkButton isExternal type="primary" href="https://nusu.co.uk/activities/view-society/131">
                                Get Involved!
                            </LinkButton>
                            <LinkButton isExternal type="secondary" href="https://discord.gg/N4dJQdafrd">
                                Join our Discord!
                            </LinkButton>
                        </div>
                    </div>
                {/snippet}
                {#snippet right()}
                    <div class="flex flex-1 justify-end">
                        <img src="/nucats.svg" alt="NuCats Logo" class="h-64 w-[256px]"/>
                    </div>
                {/snippet}
            </SplitLayout>
        </Container>
    </div>
</section>
