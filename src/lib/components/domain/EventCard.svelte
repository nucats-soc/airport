<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import type { Event } from '$lib/types/event';
	import { formatDate, formatTime } from '$lib/util/dateTime';
	import { EVENT_COLOR_CLASSES, EVENT_TEXT_COLOR_CLASSES } from '$lib/util/event';

	interface Props {
		event: Event;
	}

	let { event }: Props = $props();

	function formatPlace(event: Event): string {
		return (
			[event.location?.name, event.room].filter(Boolean).join(', ') ||
			event.location?.address ||
			'TBD'
		);
	}

	let colorClasses = $derived(EVENT_COLOR_CLASSES[event.color]);
	let textColorClasses = $derived(EVENT_TEXT_COLOR_CLASSES[event.color]);
	let formattedDate = $derived(
		event.hasTime
			? `${formatDate(event.date)} at ${formatTime(event.date)}`
			: formatDate(event.date)
	);
	let formattedPlace = $derived(formatPlace(event));
	let formattedUrl = $derived(`/events/${event.id}`);
</script>

<Box background="card" extraClass="flex min-w-0 flex-1 flex-row">
	<div class={['w-2 shrink-0 self-stretch', colorClasses]} aria-hidden="true"></div>
	<Inset space="md" extraClass="min-w-0 flex-1">
		<div class="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-start">
			<Cluster gap="sm" extraClass="min-w-0">
				<Cluster
					gap="none"
					justify="center"
					extraClass={`size-16 shrink-0 rounded-lg ${colorClasses}`}
				>
					<span class="inline-flex text-4xl" aria-hidden="true">
						{@html event.iconSvg}
					</span>
				</Cluster>

				<div class="min-w-0">
					<h3 class="tx-card-title">{event.name}</h3>
					<p class={['tx-item-title mt-0.5', textColorClasses]}>{event.type}</p>
				</div>
			</Cluster>

			{#if event.description}
				<p class="tx-body md:col-span-2">{event.description}</p>
			{/if}

			<Cluster
				gap="none"
				align="start"
				extraClass="flex-col gap-3 md:col-span-2 md:flex-row md:items-center md:gap-6"
			>
				<Cluster gap="none" extraClass="shrink-0 gap-2">
					<Icon icon="icon-[material-symbols--calendar-today]" size="sm" />
					<time class="tx-body" datetime={event.date.toISOString()}>{formattedDate}</time>
				</Cluster>

				<Cluster gap="none" extraClass="min-w-0 gap-2">
					<Icon icon="icon-[material-symbols--location-on]" size="sm" />
					<span class="tx-body truncate">{formattedPlace}</span>
				</Cluster>
			</Cluster>

			<div class="justify-self-start md:col-start-2 md:row-start-1 md:justify-self-end">
				<LinkButton href={formattedUrl} type="secondary">View Details</LinkButton>
			</div>
		</div>
	</Inset>
</Box>
