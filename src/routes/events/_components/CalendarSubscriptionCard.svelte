<script lang="ts">
	import Box from '$lib/components/layout/Box.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';
</script>

<Box background="card">
	<Inset space="lg">
		<Cluster collapse gap="sm" justify="between" extraClass="lg:gap-8">
			<Stack gap="sm" extraClass="min-w-0 w-full flex-1">
				<Cluster gap="sm">
					<Icon
						icon="icon-[material-symbols--calendar-add-on-outline]"
						extraClass="text-green-300"
					/>
					<p class="tx-card-title">Events Feed</p>
				</Cluster>
				<p class="tx-body text-zinc-300">
					Never miss an event again. Add the events feed to your calendar app to receive updates on
					your devices.
				</p>
			</Stack>
			<LinkButton type="primary" href="/events/subscribe" extraClass="w-full lg:w-auto lg:shrink-0">
				<Icon icon="icon-[material-symbols--add-to-home-screen-outline]" />
				Add to Calendar
			</LinkButton>
		</Cluster>
	</Inset>
</Box>
