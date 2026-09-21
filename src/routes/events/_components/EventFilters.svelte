<script lang="ts">
	import DropdownButton from '$lib/components/ui/DropdownButton.svelte';
	import ActionButton from '$lib/components/ui/ActionButton.svelte';
	import Checkbox from '$lib/components/ui/Checkbox.svelte';
	import Pill from '$lib/components/ui/Pill.svelte';
	import type { Event, EventColor } from '$lib/types/event';
	import { EVENT_COLOR_CLASSES } from '$lib/util/event';

	interface Props {
		events: Event[];
		eventTypeFilters: string[];
		tagFilters: string[];
		onEventTypeFiltersChange: (filters: string[]) => void;
		onTagFiltersChange: (filters: string[]) => void;
		onClear: () => void;
	}

	let {
		events,
		eventTypeFilters,
		tagFilters,
		onEventTypeFiltersChange,
		onTagFiltersChange,
		onClear
	}: Props = $props();

	let eventTypes = $derived(
		[...new Set([...events.map((event) => event.type), ...eventTypeFilters])].sort()
	);
	let tags = $derived(
		[...new Set([...events.flatMap((event) => event.tags), ...tagFilters])].sort()
	);
	let hasCustomFilters = $derived(eventTypeFilters.length > 0 || tagFilters.length > 0);

	function toggled<T>(values: T[], value: T): T[] {
		return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
	}

	function eventTypeColor(eventType: string): EventColor {
		return events.find((event) => event.type === eventType)?.color ?? 'gray';
	}
</script>

<DropdownButton
	type="icon"
	label=""
	icon="icon-[material-symbols--filter-list]"
	showArrow={false}
	ariaLabel="Filter events"
	align="right"
>
	<div
		class="grid max-h-[min(32rem,calc(100vh-8rem))] min-w-48 gap-6 overflow-x-hidden overflow-y-auto"
	>
		{#if eventTypes.length === 0 && tags.length === 0}
			<p class="tx-body text-zinc-300">No filters available for this selection.</p>
		{/if}

		{#if eventTypes.length > 0}
			<fieldset class="grid gap-1">
				<legend class="tx-item-title mb-2">Event Types</legend>
				{#each eventTypes as eventType}
					<Checkbox
						checked={eventTypeFilters.includes(eventType)}
						onChange={() => onEventTypeFiltersChange(toggled(eventTypeFilters, eventType))}
					>
						<Pill extraClass={EVENT_COLOR_CLASSES[eventTypeColor(eventType)]}>{eventType}</Pill>
					</Checkbox>
				{/each}
			</fieldset>
		{/if}

		{#if tags.length > 0}
			<fieldset class="grid gap-1">
				<legend class="tx-item-title mb-2">Event Tags</legend>
				{#each tags as tag}
					<Checkbox
						checked={tagFilters.includes(tag)}
						onChange={() => onTagFiltersChange(toggled(tagFilters, tag))}
					>
						{tag}
					</Checkbox>
				{/each}
			</fieldset>
		{/if}

		{#if hasCustomFilters}
			<ActionButton
				type="secondary"
				onClick={onClear}
				extraClass="w-fit !text-brand-light hover:!text-brand-light"
			>
				Reset filters
			</ActionButton>
		{/if}
	</div>
</DropdownButton>
