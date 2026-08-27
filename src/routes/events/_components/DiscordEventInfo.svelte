<script lang="ts">
	import EventActionCard from './EventActionCard.svelte';
	const discordInvite = 'https://discord.gg/N4dJQdafrd';
</script>

<EventActionCard
	title="Stay Connected"
	description="Join our Discord to suggest event ideas and get updates as soon as new events are added to the calendar."
	icon="icon-[material-symbols--link]"
	actionIcon="icon-[simple-icons--discord]"
	actionLabel="Join Discord"
	href={discordInvite}
	isExternal
/>
