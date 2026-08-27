<script lang="ts">
	import LinkButton from '$lib/components/ui/LinkButton.svelte';
	import type { Event } from '$lib/types/event';
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import type { Place } from '$lib/types/place';
	import Icon from '$lib/components/ui/Icon.svelte';

	type EventNonNullLocation = Event & { location: Place };

	interface Props {
		event: EventNonNullLocation;
	}

	interface Attribute {
		name: string;
		icon: string;
		value: string;
	}

	let { event }: Props = $props();

	function getMapQuery(event: EventNonNullLocation): string | undefined {
		const place = event.location;

		if (place.latitude !== undefined && place.longitude !== undefined) {
			return `${place.latitude},${place.longitude}`;
		}

		return encodeURIComponent([place.name, place.address].filter(Boolean).join(', '));
	}

	function getAttributes(event: EventNonNullLocation): Attribute[] {
		let attributes: Attribute[] = [];
		attributes.push({
			name: 'Venue',
			icon: 'icon-[material-symbols--location-on-outline]',
			value: event.location.name
		});
		if (event.location.address) {
			attributes.push({
				name: 'Address',
				icon: 'icon-[material-symbols--map-outline]',
				value: event.location.address
			});
		}
		if (event.room) {
			attributes.push({
				name: 'Room',
				icon: 'icon-[material-symbols--meeting-room-outline]',
				value: `Room ${event.room}`
			});
		}
		if (event.location.longitude && event.location.latitude) {
			attributes.push({
				name: 'Coordinates',
				icon: 'icon-[material-symbols--my-location]',
				value: `${event.location.latitude}, ${event.location.longitude}`
			});
		}
		return attributes;
	}

	let attributes = $derived(getAttributes(event));
	let mapQuery = $derived(getMapQuery(event));
	let mapPreviewUrl = $derived(`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`);
	let googleMapsUrl = $derived(`https://www.google.com/maps/search/?api=1&query=${mapQuery}`);
</script>

<Box background="card" extraClass="flex flex-1 flex-col">
	<div class="relative h-48 w-full bg-zinc-700">
		<iframe
			title={`Map showing ${event.location.name}`}
			src={mapPreviewUrl}
			class="pointer-events-none h-full w-full border-0"
			loading="lazy"
			referrerpolicy="no-referrer-when-downgrade"
		></iframe>
		<a
			href={googleMapsUrl}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={`Open ${event.location.name} in Google Maps`}
			class="absolute inset-0"
		></a>
	</div>
	<Inset space="md" extraClass="flex flex-1">
		<Stack gap="md" extraClass="min-w-0 flex-1">
			<dl class="tx-body flex flex-col gap-4">
				{#each attributes as attribute}
					<div class="flex gap-3">
						<div class="mt-0.5 flex shrink-0">
							<Icon icon={attribute.icon} size="sm" />
							<dt class="sr-only">{attribute.name}</dt>
						</div>
						<dd>{attribute.value}</dd>
					</div>
				{/each}
			</dl>
			<div class="mt-auto flex justify-center">
				<LinkButton type="secondary" href={googleMapsUrl} isExternal extraClass="w-full"
					>Open Google Maps</LinkButton
				>
			</div>
		</Stack>
	</Inset>
</Box>
