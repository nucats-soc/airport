<script lang="ts">
	import Container from '$lib/components/layout/Container.svelte';
	import Stack from '$lib/components/layout/Stack.svelte';
	import PageHeader from '$lib/components/ui/PageHeader.svelte';
	import Selector from '$lib/components/ui/Selector.svelte';
	import LinkButton from '$lib/components/ui/LinkButton.svelte';
	import CopyButton from '$lib/components/ui/CopyButton.svelte';
	import Box from '$lib/components/layout/Box.svelte';
	import Inset from '$lib/components/layout/Inset.svelte';
	import Cluster from '$lib/components/layout/Cluster.svelte';
	import Icon from '$lib/components/ui/Icon.svelte';
	import PageMetadata from '$lib/components/PageMetadata.svelte';

	import headerImage from '$lib/assets/headers/events.jpg?enhanced';
	import manage from '$lib/assets/subscribe/manage.png?enhanced';
	import add from '$lib/assets/subscribe/add.png?enhanced';
	import setUrl from '$lib/assets/subscribe/set-url.png?enhanced';

	const calendarOptions = [
		{
			value: 'apple',
			label: 'Apple Calendar',
			icon: 'icon-[simple-icons--apple]'
		},
		{
			value: 'google',
			label: 'Google Calendar',
			icon: 'icon-[simple-icons--android]'
		},
		{
			value: 'manual',
			label: 'Other',
			icon: 'icon-[material-symbols--note]'
		}
	];

	let currentTab = $state('none');
</script>

<PageMetadata
	title="Subscribe to Events"
	description="Subscribe to the NUCATS events calendar from Apple Calendar, Google Calendar, or another calendar app."
/>

<Container>
	<Stack gap="md">
		<PageHeader
			image={headerImage}
			title="Subscribe to Events"
			description="Get events directly to your devices."
		/>
		<Selector options={calendarOptions} bind:value={currentTab} ariaLabel="Calendar type" />
		{#if currentTab === 'none'}
			<Box background="card">
				<Inset>
					<Cluster>
						<Icon icon="icon-[material-symbols--info]" extraClass="text-indigo-200" />
						<p class="tx-body">
							This process varies based on which devices or calendar services you use. Select the
							calendar application that you use to continue.
						</p>
					</Cluster>
				</Inset>
			</Box>
		{/if}
		{#if currentTab === 'apple'}
			<div class="prose prose-invert">
				<h2>Apple Devices</h2>
				<p>Subscribe to the events calendar from your Apple device.</p>
				<div class="not-prose">
					<LinkButton
						type="primary"
						href="webcal://nucats.org/events.ics"
						extraClass="lg:w-fit"
						isExternal
						openInNewTab={false}
					>
						Add to Calendar
					</LinkButton>
				</div>
				<h3>Steps</h3>
				<ol>
					<li>Press "Add to Calendar"</li>
					<li>Your calendar app should open with the Calendar URL.</li>
					<li>Press <strong>Find</strong> to subscribe to the Calendar.</li>
					<li>You're done, new events should now appear in your calendar app!</li>
				</ol>
			</div>
		{/if}
		{#if currentTab === 'google'}
			<div class="prose prose-invert">
				<h2>Google Calendar</h2>
				<p>Subscribe to the events calendar using Google Calendar.</p>
				<div class="not-prose">
					<LinkButton
						type="primary"
						href="https://www.google.com/calendar/r?cid=webcal%3A%2F%2Fnucats.org%2Fevents.ics"
						extraClass="lg:w-fit"
						isExternal
					>
						Add to Calendar
					</LinkButton>
				</div>
				<h3>Steps</h3>
				<ol>
					<li>Make sure you're signed into your Google account in a web browser.</li>
					<li>Press "Add to Calendar"</li>
					<li>The Google Calendar website should open in a new browser tab.</li>
					<li>Press <strong>Add</strong> to subscribe to the Calendar.</li>
					<li>You're done, new events should now appear in your calendar app!</li>
				</ol>
			</div>
		{/if}
		{#if currentTab === 'manual'}
			<div class="prose prose-invert">
				<h2>Manual Subscription</h2>
				<p>
					If you do not use Apple or Google's Calendar you will have to manually subscribe to the
					events calendar.
				</p>
				<div class="not-prose">
					<CopyButton type="primary" value="https://nucats.org/events.ics" extraClass="lg:w-fit">
						Copy Calendar URL
					</CopyButton>
				</div>
				<h3>Steps</h3>
				<ol>
					<li>Press "Copy Calendar URL"</li>
					<li>Navigate to your calendar app.</li>
					<li>
						Find an option to manage or add calendars.
						<enhanced:img
							src={manage}
							alt="GNOME Calendar button labeled Manage Calendar"
							loading="lazy"
						/>
					</li>
					<li>
						Choose to add a calendar from a URL, this may be under various different labels:
						<ul>
							<li>From URL</li>
							<li>Subscribe</li>
							<li>Add Calendar Subscription</li>
							<li>Connect to an Online Calendar</li>
							<li>Webcal</li>
							<li>Sometimes simply under "Add Calendar"</li>
						</ul>
						<enhanced:img
							src={add}
							alt="GNOME Calendar dialog showing all calendars with an option to Add Calendar"
							loading="lazy"
						/>
					</li>
					<li>
						Paste the URL copied from this page into the URL input and follow any additional
						prompts.
						<enhanced:img
							src={setUrl}
							alt="GNOME Calendar new calendar dialog showing where to paste the Calendar URL."
							loading="lazy"
						/>
					</li>
					<li>You're done, new events should now appear in your calendar app!</li>
				</ol>
			</div>
		{/if}
	</Stack>
</Container>
