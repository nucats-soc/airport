<script lang="ts">
	import './layout.css';
	import Navbar from './_components/Navbar.svelte';
	import Footer from './_components/Footer.svelte';

	let { children } = $props();
</script>

<div class="relative min-h-screen bg-zinc-900">
	<div class="relative flex min-h-screen w-full flex-col text-white">
		<Navbar />
		<main class="flex-1">
			{@render children()}
		</main>
		<Footer />
	</div>
</div>
