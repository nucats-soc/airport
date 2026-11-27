<script lang="ts">
	import PageHeader from '#lib/components/PageHeader.svelte';
	import LinkButton from '#lib/components/button/LinkButton.svelte';
	import CopyButton from '#lib/components/button/CopyButton.svelte';
	import PageMetadata from '#lib/components/PageMetadata.svelte';
	import { getHref } from '#lib/links.js';

	import headerImage from '#lib/assets/headers/events.jpg?enhanced';
	import manage from '#lib/assets/subscribe/manage.png?enhanced';
	import add from '#lib/assets/subscribe/add.png?enhanced';
	import setUrl from '#lib/assets/subscribe/set-url.png?enhanced';

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

	let currentTab = $state<string>();
</script>

<PageMetadata
	title="Subscribe to Events"
	description="Subscribe to the NUCATS events calendar from Apple Calendar, Google Calendar, or another calendar app."
/>

<div class="page-container flex flex-col gap-md">
	<PageHeader
		image={headerImage}
		title="Subscribe to Events"
		description="Get events directly to your devices."
	/>

	<fieldset class="box p-sm">
		<legend class="sr-only">Calendar type</legend>
		<div class="flex flex-col justify-between gap-md lg:flex-row">
			{#each calendarOptions as option (option.value)}
				<label
					class="tx-header-3 flex w-full cursor-pointer items-center justify-center gap-sm rounded-lg p-sm transition-colors duration-200 hover:bg-zinc-700 has-checked:bg-zinc-700 has-checked:text-brand-light has-focus-visible:outline-2 has-focus-visible:outline-brand-light"
				>
					<input type="radio" class="sr-only" value={option.value} bind:group={currentTab} />
					<span class={[option.icon, 'size-4 shrink-0']} aria-hidden="true"></span>
					{option.label}
				</label>
			{/each}
		</div>
	</fieldset>

	{#if !currentTab}
		<div class="box row">
			<span
				class="icon-[material-symbols--info] size-6 shrink-0 text-brand-light"
				aria-hidden="true"
			></span>
			<p class="tx-base">
				This process varies based on which devices or calendar services you use. Select the calendar
				application that you use to continue.
			</p>
		</div>
	{/if}
	{#if currentTab === 'apple'}
		<div class="prose prose-invert">
			<h2>Apple Devices</h2>
			<p>Subscribe to the events calendar from your Apple device.</p>
			<div class="not-prose">
				<LinkButton
					variant="primary"
					href={getHref('calendar-apple')}
					external
					openInNewTab={false}
				>
					Add to Calendar
				</LinkButton>
			</div>
			<h3>Steps</h3>
			<ol>
				<li>Press "Add to Calendar"</li>
				<li>Your calendar app should open with the Calendar URL.</li>
				<li>
					Configure the feed, ensuring frequency is set to 1 hour for the most up to date updates.
				</li>
				<li>You're done, new events should now appear in your calendar app!</li>
			</ol>
		</div>
	{/if}
	{#if currentTab === 'google'}
		<div class="prose prose-invert">
			<h2>Google Calendar</h2>
			<p>Subscribe to the events calendar using Google Calendar.</p>
			<div class="not-prose">
				<LinkButton variant="primary" href={getHref('calendar-google')} external>
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
				<CopyButton variant="primary" value={getHref('calendar-feed')}>Copy Calendar URL</CopyButton
				>
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
					Paste the URL copied from this page into the URL input and follow any additional prompts.
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
</div>
