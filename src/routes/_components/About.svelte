<script lang="ts">
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
</script>

<section class="page-container py-8">
	<h2 class="tx-header-2">What do we do?</h2>
	<p class="tx-base">
		We have something for everyone, whether it be game nights and tournaments, coding workshops, or
		networking events.
	</p>
	<ul class="grid grid-cols-1 gap-sm py-sm sm:grid-cols-2 md:grid-cols-3">
		{#each thingsWeDo as thingWeDo}
			<li
				class="box flex flex-col items-center gap-sm text-center transition-colors hover:bg-zinc-700"
			>
				<span class={[thingWeDo.icon, thingWeDo.color, 'size-8 shrink-0']} aria-hidden="true"
				></span>
				<div>
					<p class={[thingWeDo.color, 'tx-header-3']}>{thingWeDo.name}</p>
					<p class="tx-base">{thingWeDo.description}</p>
				</div>
			</li>
		{/each}
	</ul>
</section>
