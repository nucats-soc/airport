<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import classNames from 'classnames';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';

	interface ThingWeDo {
		name: string;
		description: string;
		color: string;
		icon: string;
	}

	const thingsWeDo: ThingWeDo[] = [
		{
			name: 'Game Nights',
			description: 'Casual nights and tournaments',
			icon: 'icon-[material-symbols--joystick]',
			color: 'text-indigo-200'
		},
		{
			name: 'Coding Workshops',
			description: 'For both CS and non-CS students',
			icon: 'icon-[material-symbols--code-xml]',
			color: 'text-green-200'
		},
		{
			name: 'Hackathons',
			description: 'Code competitively!',
			icon: 'icon-[material-symbols--lightbulb]',
			color: 'text-yellow-200'
		},
		{
			name: 'Pub Crawls',
			description: 'Fairly self explanatory',
			icon: 'icon-[material-symbols--beer-meal]',
			color: 'text-orange-200'
		},
		{
			name: 'Charity events',
			description: 'Fundraise with us!',
			icon: 'icon-[material-symbols--volunteer-activism]',
			color: 'text-pink-200'
		},
		{
			name: 'Networking',
			description: 'Meet people in industry',
			icon: 'icon-[material-symbols--network-node]',
			color: 'text-red-200'
		}
	];

	function getTitleClasses(thingWeDo: ThingWeDo): string {
		return classNames(thingWeDo.color, 'tx-item-title');
	}
</script>

<Container extraClass="py-8">
	<p class="tx-section-title">What do we do?</p>
	<p class="tx-body">
		We have something for everyone, whether it be game nights and tournaments, coding workshops, or
		networking events.
	</p>
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 md:grid-cols-3">
		{#each thingsWeDo as thingWeDo}
			<Box background="card" extraClass="flex-1 cursor-pointer transition-colors hover:bg-zinc-700">
				<Inset space="md">
					<Stack align="center" gap="sm">
						<Icon icon={thingWeDo.icon} size="lg" extraClass={thingWeDo.color} />
						<div class="text-center">
							<p class={getTitleClasses(thingWeDo)}>{thingWeDo.name}</p>
							<p class="tx-body">{thingWeDo.description}</p>
						</div>
					</Stack>
				</Inset>
			</Box>
		{/each}
	</div>
</Container>
