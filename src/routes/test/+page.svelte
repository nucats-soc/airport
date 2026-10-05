<script lang="ts">
    import {getHref, getLinks, type SiteLink} from '#lib/links.js';
    import ExternalArrow from "#lib/components/icon/ExternalArrow.svelte";

    const links: SiteLink[] = getLinks(
        'home',
        'events',
        'committee'
    );
</script>

<div class="page-container">
    <div class="page-content">
        <nav class="row justify-between">
            <a href={getHref('home')} class="flex shrink-0 items-center gap-4" aria-label="NUCATS home">
                <img class="h-12 w-auto" src="/nucats.svg" alt="" width="45" height="50"/>
                <span class="text-2xl leading-none font-extrabold tracking-normal text-white">NUCATS</span>
            </a>
            <ul class="row gap-lg">
                {#each links as link}
                    <li>
                        <a href={link.href} class="row gap-sm hover:text-brand-light transition-colors">
                            <span class={[link.icon, 'size-md']}></span>
                            {link.label}
                            {#if link.external}
                                <ExternalArrow/>
                            {/if}
                        </a>
                    </li>
                {/each}
            </ul>
        </nav>
    </div>
</div>
