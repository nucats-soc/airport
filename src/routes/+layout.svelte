<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from "$lib/assets/Navbar.svelte";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<div class="relative min-h-screen bg-zinc-900 flex items-center justify-center">
    <!-- self closing div to give us bg effect, might add floating animation -->
    <div class="pointer-effects-none absolute inset-0 bg-[url('/bg-patt.svg')] bg-repeat opacity-5"></div>

    <div class="relative min-h-screen w-225 text-white">
        <Navbar />
		{@render children()}
    </div>
</div>
