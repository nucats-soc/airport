<script lang="ts">
	import type { ClassValue } from 'svelte/elements';
	import { prefersReducedMotion } from 'svelte/motion';
	import { slide } from 'svelte/transition';
	import EventCard from '#lib/components/domain/EventCard.svelte';
	import ExpandCollapseArrow from '#lib/components/icon/ExpandCollapseArrow.svelte';
	import type { Event } from '#lib/types/event.js';

	interface Props {
		events: Event[];
		kind: 'previous' | 'planned';
		class?: ClassValue;
	}

	let { events, kind, class: className }: Props = $props();

	const contentId = $props.id();
	const icons = {
		previous: 'icon-[material-symbols--history]',
		planned: 'icon-[material-symbols--event-upcoming-outline]'
	};

	let open = $state(false);
</script>

<div class={['flex flex-col', className]}>
	<button
		type="button"
		class="group flex w-full cursor-pointer items-center justify-between rounded-2xl bg-zinc-800 p-sm text-zinc-400 transition-colors hover:bg-zinc-700/80 hover:text-zinc-200 active:bg-zinc-700 sm:px-md"
		aria-expanded={open}
		aria-controls={contentId}
		onclick={() => (open = !open)}
	>
		<span class="flex items-center gap-3">
			<span class={[icons[kind], 'size-6 shrink-0']} aria-hidden="true"></span>
			<span class="tx-header-3 text-zinc-100">
				{open ? 'Hide' : 'Show'}
				{events.length}
				{kind}
				{events.length === 1 ? 'event' : 'events'}
			</span>
		</span>
		<ExpandCollapseArrow expanded={open} />
	</button>

	{#if open}
		<div
			id={contentId}
			class="grid gap-sm pt-sm"
			transition:slide={{ duration: prefersReducedMotion.current ? 0 : 300 }}
		>
			{#each events as event (event.id)}
				<EventCard {event} />
			{/each}
		</div>
	{/if}
</div>
