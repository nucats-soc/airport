<script lang="ts">
	import LinkButton from '#lib/components/button/LinkButton.svelte';
	import type { Event } from '#lib/types/event.js';
	import type { Place } from '#lib/types/place.js';

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
				value: event.room
			});
		}
		if (event.location.what3words) {
			attributes.push({
				name: 'what3words',
				icon: 'icon-[simple-icons--what3words]',
				value: event.location.what3words
			});
		}
		return attributes;
	}

	let attributes = $derived(getAttributes(event));
	let mapQuery = $derived(getMapQuery(event));
	let mapPreviewUrl = $derived(`https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`);
	let googleMapsUrl = $derived(`https://www.google.com/maps/search/?api=1&query=${mapQuery}`);
</script>

<div class="box flex flex-1 flex-col p-0">
	<div class="relative h-48 w-full bg-zinc-700">
		<iframe
			title={`Map showing ${event.location.name}`}
			src={mapPreviewUrl}
			class="pointer-events-none size-full border-0"
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
	<div class="flex min-w-0 flex-1 flex-col gap-md p-md">
		<dl class="tx-base flex flex-col gap-sm">
			{#each attributes as attribute}
				<div class="flex gap-3">
					<span class={[attribute.icon, 'mt-1 size-4 shrink-0']} aria-hidden="true"></span>
					<dt class="sr-only">{attribute.name}</dt>
					<dd>{attribute.value}</dd>
				</div>
			{/each}
		</dl>
		<LinkButton type="secondary" href={googleMapsUrl} external fill class="mt-auto">
			Open Google Maps
		</LinkButton>
	</div>
</div>
