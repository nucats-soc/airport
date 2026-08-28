<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';

	const discordInvite = 'https://discord.gg/N4dJQdafrd';
</script>

<Box background="card">
	<Inset space="lg">
		<Stack gap="sm">
			<Cluster gap="sm">
				<Icon icon="icon-[material-symbols--link]" extraClass="text-indigo-300" />
				<p class="tx-card-title">Stay Connected</p>
			</Cluster>
			<p class="tx-body text-zinc-300">
				Join our Discord to suggest event ideas and get updates as soon as new events are added to
				the calendar.
			</p>
			<LinkButton type="primary" href={discordInvite} isExternal extraClass="w-full">
				<Icon icon="icon-[simple-icons--discord]" />
				Join Discord
			</LinkButton>
		</Stack>
	</Inset>
</Box>
