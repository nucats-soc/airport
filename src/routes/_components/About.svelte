<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Card from '$lib/components/card/Card.svelte';

	interface ThingWeDo {
		name: string;
		description: string;
		color: string;
		icon: string;
	}

	const thingsWeDo: ThingWeDo[] = [
		{
			name: 'Game Nights',
			description: 'We play games and stuff',
			icon: 'icon-[material-symbols--joystick]',
			color: 'text-indigo-200'
		},
		{
			name: 'Game Nights',
			description: 'We play games and stuff',
			icon: 'icon-[material-symbols--joystick]',
			color: 'text-indigo-200'
		},
		{
			name: 'Game Nights',
			description: 'We play games and stuff',
			icon: 'icon-[material-symbols--joystick]',
			color: 'text-indigo-200'
		},
		{
			name: 'Game Nights',
			description: 'We play games and stuff',
			icon: 'icon-[material-symbols--joystick]',
			color: 'text-indigo-200'
		},
		{
			name: 'Game Nights',
			description: 'We play games and stuff',
			icon: 'icon-[material-symbols--joystick]',
			color: 'text-indigo-200'
		},
		{
			name: 'Game Nights',
			description: 'We play games and stuff',
			icon: 'icon-[material-symbols--joystick]',
			color: 'text-indigo-200'
		}
	];
</script>

<Container>
	<p class="tx-section-title">What do we do?</p>
	<p class="tx-body">Glad you asked! As a society we try to do a lot of things.</p>
	<div class="about-grid grid grid-cols-2 gap-4 py-4 md:grid-cols-3">
		{#each thingsWeDo as thingWeDo, i}
			<Card padding="md" extraClass="hover:bg-zinc-700 transition-colors cursor-pointer">
				<div class="flex flex-col items-center gap-4">
					<span class={[thingWeDo.icon, thingWeDo.color, 'size-12 shrink-0']}></span>
					<div class="text-center">
						<p class={[thingWeDo.color, 'tx-item-title']}>{thingWeDo.name}</p>
						<p class="tx-body">{thingWeDo.description}</p>
					</div>
				</div>
			</Card>
		{/each}
	</div>
</Container>
