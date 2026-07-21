<script lang="ts">
    import Container from "$lib/components/container/Container.svelte";

    const navItems = [
        { label: "Home", href: "/", icon: "icon-[material-symbols--home-outline]", active: true },
        { label: "Committee", href: "/committee", icon: "icon-[material-symbols--groups]" },
        { label: "Events", href: "/events", icon: "icon-[material-symbols--calendar-month-outline]" },
        { label: "Sponsors", href: "/sponsors", icon: "icon-[material-symbols--apartment]" },
    ];
</script>

<header class="w-full bg-[#18181b]">
    <Container>
        <div class="flex min-h-28 items-center justify-between gap-8 px-4">
            <a href="/" class="flex shrink-0 items-center gap-5" aria-label="NUCATS home">
                <img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50" />
                <span class="text-2xl font-extrabold tracking-normal text-white">NUCATS</span>
            </a>

            <nav class="flex items-center gap-9 overflow-x-auto" aria-label="Primary navigation">
                {#each navItems as item}
                    <a
                        href={item.href}
                        aria-current={item.active ? "page" : undefined}
                        class="group flex items-center gap-3 whitespace-nowrap text-[16px] text-white transition-colors duration-200 hover:text-indigo-300"
                        class:text-indigo-300={item.active}
                    >
                        <span
                            class={[
                                item.icon,
                                "h-6 w-6 shrink-0 text-white transition-colors duration-200 group-hover:text-indigo-300",
                                item.active ? "text-indigo-300" : "",
                            ]}
                            aria-hidden="true"
                        ></span>
                        <span>{item.label}</span>
                    </a>
                {/each}
            </nav>
        </div>
    </Container>
</header>
