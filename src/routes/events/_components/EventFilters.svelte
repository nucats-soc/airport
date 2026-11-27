<script lang="ts">
	import ActionButton from '#lib/components/button/ActionButton.svelte';
	import DropdownButton from '#lib/components/button/DropdownButton.svelte';
	import type { Event, EventColor } from '#lib/types/event.js';
	import { EVENT_COLOR_CLASSES } from '#lib/util/event.js';

	interface Props {
		events: Event[];
		eventTypeFilters: string[];
		tagFilters: string[];
	}

	let { events, eventTypeFilters = $bindable(), tagFilters = $bindable() }: Props = $props();

	let eventTypes = $derived(
		[...new Set([...events.map((event) => event.type), ...eventTypeFilters])].sort()
	);
	let tags = $derived(
		[...new Set([...events.flatMap((event) => event.tags), ...tagFilters])].sort()
	);
	let hasFilters = $derived(eventTypeFilters.length > 0 || tagFilters.length > 0);

	function eventTypeColor(eventType: string): EventColor {
		return events.find((event) => event.type === eventType)?.color ?? 'gray';
	}

	const labelClasses =
		'tx-base flex cursor-pointer items-center gap-xs rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-600';

	function clearFilters() {
		eventTypeFilters = [];
		tagFilters = [];
	}
</script>

{#snippet checkmark(checked: boolean)}
	<span
		class={[
			'flex size-5 shrink-0 items-center justify-center rounded-lg text-white transition-colors',
			'peer-focus-visible:ring-2 peer-focus-visible:ring-brand-light peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-zinc-700',
			checked ? 'bg-brand' : 'bg-zinc-900'
		]}
		aria-hidden="true"
	>
		{#if checked}
			<span class="icon-[material-symbols--check] size-4"></span>
		{/if}
	</span>
{/snippet}

<DropdownButton variant="secondary" shape="square" noArrow align="end" aria-label="Filter events">
	{#snippet buttonLabel()}
		<span class="icon-[material-symbols--filter-list] size-4" aria-hidden="true"></span>
	{/snippet}

	<div
		class="grid max-h-[min(32rem,calc(100vh-8rem))] min-w-48 gap-md overflow-x-hidden overflow-y-auto"
	>
		{#if eventTypes.length === 0 && tags.length === 0}
			<p class="tx-base text-zinc-300">No filters available for this selection.</p>
		{/if}

		{#if eventTypes.length > 0}
			<fieldset class="grid gap-1">
				<legend class="tx-header-3 mb-2">Event Types</legend>
				{#each eventTypes as eventType}
					<label class={labelClasses}>
						<input
							type="checkbox"
							class="peer sr-only"
							value={eventType}
							bind:group={eventTypeFilters}
						/>
						{@render checkmark(eventTypeFilters.includes(eventType))}
						<span class={['pill', EVENT_COLOR_CLASSES[eventTypeColor(eventType)]]}>{eventType}</span
						>
					</label>
				{/each}
			</fieldset>
		{/if}

		{#if tags.length > 0}
			<fieldset class="grid gap-1">
				<legend class="tx-header-3 mb-2">Event Tags</legend>
				{#each tags as tag}
					<label class={labelClasses}>
						<input type="checkbox" class="peer sr-only" value={tag} bind:group={tagFilters} />
						{@render checkmark(tagFilters.includes(tag))}
						{tag}
					</label>
				{/each}
			</fieldset>
		{/if}

		{#if hasFilters}
			<ActionButton variant="secondary" class="text-brand-light!" onclick={clearFilters}>
				Reset filters
			</ActionButton>
		{/if}
	</div>
</DropdownButton>
