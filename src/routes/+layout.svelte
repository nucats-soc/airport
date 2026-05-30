<script lang="ts">
    import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from "$lib/assets/Navbar.svelte";

	let { children } = $props();

    // add bg class to body, stops ugly white borders when bg is moving
    onMount(() => {
        document.body.classList.add(
            'bg-zinc-900',
            'overflow-hidden',
            'overflow-x-hidden'
        );
    });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="relative min-h-screen bg-zinc-900 flex items-center justify-center">
    <!-- self closing div to give us bg effect, might add floating animation -->
    <div class="pointer-events-none absolute inset-0 bg-[url('/bg-patt.svg')] bg-repeat opacity-2 will-change-transform animate-[bgFloat_15s_linear_infinite]"></div>

    <div class="relative min-h-screen w-225 text-white">
        <Navbar />
		{@render children()}
    </div>
</div>
