<script lang="ts">
	import { getHref } from '#lib/links.js';
	import LinkButton from '#lib/components/button/LinkButton.svelte';
	import AnimatedCatBackground from './AnimatedCatBackground.svelte';
</script>

<AnimatedCatBackground>
	<div class="page-container split-layout split-layout-reverse py-24">
		<div class="flex-1 flex-col justify-center gap-sm">
			<div>
				<div class="flex items-baseline gap-sm">
					<h1 class="tx-header">We are NUCATS!</h1>
					<p class="tx-base-muted text-xl leading-snug">meow!</p>
				</div>
				<p class="tx-base">
					NUCATS (Newcastle University Computing and Technology Society) is a student-run society
					for computing students, or for anyone with an interest in tech!
				</p>
			</div>
			<div class="flex flex-col gap-sm sm:flex-row">
				<LinkButton external type="primary" href={getHref('join')}>Get Involved!</LinkButton>
				<LinkButton external type="secondary" href={getHref('discord')}>
					Join our Discord!
				</LinkButton>
			</div>
		</div>
		<div class="flex-1 justify-center lg:justify-end">
			<img src="/nucats.svg" alt="NuCats Logo" class="size-32 md:size-48" />
		</div>
	</div>
</AnimatedCatBackground>
