<script lang="ts">
    import { onMount } from 'svelte';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from "$lib/components/navigation/Navbar.svelte";
    import Footer from "$lib/components/navigation/Footer.svelte";

	let { children } = $props();

    // // add bg class to body, stops ugly white borders when bg is moving
    // onMount(() => {
    //     document.body.classList.add(
    //         'bg-zinc-900',
    //         'overflow-x-hidden'
    //     );
    // });
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<div class="relative min-h-screen bg-zinc-900 flex items-center justify-center">
    <div class="relative min-h-screen w-full text-white">
        <Navbar />
		{@render children()}
        <Footer/>
    </div>
</div>
