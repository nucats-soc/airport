<script lang="ts">
	import ActionCard from '$lib/components/ui/ActionCard.svelte';

	const discordInvite = 'https://discord.gg/N4dJQdafrd';
</script>

<ActionCard
	icon="icon-[material-symbols--link]"
	iconClass="text-indigo-300"
	title="Stay Connected"
	description="Join our Discord to suggest event ideas and get updates as soon as new events are added to the calendar."
	buttonIcon="icon-[simple-icons--discord]"
	buttonLabel="Join Discord"
	buttonHref={discordInvite}
	buttonExternal
	stacked
/>
