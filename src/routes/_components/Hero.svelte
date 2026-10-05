<script lang="ts">
	import { getHref } from '#lib/links.js';
	import Container from '#lib/components/layout/Container.svelte';
	import SplitLayout from '#lib/components/layout/SplitLayout.svelte';
	import Stack from '#lib/components/layout/Stack.svelte';
	import LinkButton from '#lib/components/ui/LinkButton.svelte';
	import AnimatedCatBackground from './AnimatedCatBackground.svelte';
</script>

<AnimatedCatBackground>
	<div class="py-24">
		<Container>
			<SplitLayout reverseOnSmall>
				{#snippet left()}
					<Stack gap="sm" extraClass="flex-1 justify-center">
						<div>
							<div class="flex items-baseline gap-4">
								<h1 class="tx-header">We are NUCATS!</h1>
								<p class="tx-base-muted text-xl leading-snug">meow!</p>
							</div>
							<p class="tx-base">
								NUCATS (Newcastle University Computing and Technology Society) is a student-run
								society for computing students, or for anyone with an interest in tech!
							</p>
						</div>
						<div class="flex flex-col gap-4 sm:flex-row">
							<LinkButton isExternal type="primary" href={getHref('join')}>
								Get Involved!
							</LinkButton>
							<LinkButton isExternal type="secondary" href={getHref('discord')}>
								Join our Discord!
							</LinkButton>
						</div>
					</Stack>
				{/snippet}
				{#snippet right()}
					<div class="flex flex-1 justify-center lg:justify-end">
						<img src="/nucats.svg" alt="NuCats Logo" class="h-32 w-32 md:h-48 md:w-48" />
					</div>
				{/snippet}
			</SplitLayout>
		</Container>
	</div>
</AnimatedCatBackground>
