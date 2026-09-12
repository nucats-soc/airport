<script lang="ts">
	import EventCard from '$lib/components/domain/EventCard.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { Event } from '$lib/types/event';
	import classNames from 'classnames';

	interface Props {
		events: Event[];
		extraClass?: string;
	}

	let { events, extraClass }: Props = $props();
	let open = $state(false);
	let contentId = $props.id();

	let label = $derived(
		open
			? `Hide ${events.length} previous ${events.length === 1 ? 'event' : 'events'}`
			: `Show ${events.length} previous ${events.length === 1 ? 'event' : 'events'}`
	);
</script>

<div class={classNames('flex flex-col', extraClass)}>
	<button
		type="button"
		class="group flex w-full cursor-pointer items-center justify-between rounded-[1.25rem] bg-zinc-800 p-4 transition-colors hover:bg-zinc-700/80 active:bg-zinc-700 sm:px-6"
		aria-expanded={open}
		aria-controls={contentId}
		onclick={() => (open = !open)}
	>
		<div class="flex items-center gap-3">
			<Icon
				icon="icon-[material-symbols--history]"
				size="md"
				extraClass="text-zinc-400 transition-colors group-hover:text-zinc-200"
			/>
			<span class="tx-item-title text-zinc-100">
				{label}
			</span>
		</div>
		<Icon
			icon="icon-[material-symbols--keyboard-arrow-down]"
			size="md"
			extraClass={classNames(
				'text-zinc-400 transition-transform duration-300 group-hover:text-zinc-200',
				{
					'rotate-180': open
				}
			)}
		/>
	</button>

	<div
		id={contentId}
		class={classNames(
			'grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none',
			open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
		)}
		inert={!open}
	>
		<div class="overflow-hidden">
			<div class="grid gap-4 pt-4">
				{#each events as event (event.id)}
					<EventCard {event} />
				{/each}
			</div>
		</div>
	</div>
</div>
