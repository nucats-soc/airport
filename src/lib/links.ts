/** Shared destinations for navigation, social links, and static calls to action. */
export interface SiteLink {
	href: string;
	label: string;
	icon?: string;
	external?: boolean;
	openInNewTab?: boolean;
}

const linkDefinitions = {
	home: {
		href: '/',
		label: 'Home',
		icon: 'icon-[material-symbols--home-outline]'
	},
	events: {
		href: '/events',
		label: 'Events',
		icon: 'icon-[material-symbols--calendar-month-outline]'
	},
	committee: {
		href: '/committee',
		label: 'Committee',
		icon: 'icon-[material-symbols--groups]'
	},
	terms: {
		href: '/tos',
		label: 'Terms of Service',
		icon: 'icon-[material-symbols--gavel]'
	},
	privacy: {
		href: '/privacy',
		label: 'Privacy Policy',
		icon: 'icon-[material-symbols--shield-outline]'
	},
	'events-subscribe': {
		href: '/events/subscribe',
		label: 'Subscribe to Events',
		icon: 'icon-[material-symbols--calendar-add-on-outline]'
	},
	discord: {
		href: 'https://discord.gg/N4dJQdafrd',
		label: 'Discord',
		icon: 'icon-[simple-icons--discord]',
		external: true
	},
	instagram: {
		href: 'https://instagram.com/nucats_',
		label: 'Instagram',
		icon: 'icon-[simple-icons--instagram]',
		external: true
	},
	github: {
		href: 'https://github.com/NUCats-soc',
		label: 'GitHub',
		icon: 'icon-[simple-icons--github]',
		external: true
	},
	linktree: {
		href: 'https://linktr.ee/nucats',
		label: 'Linktree',
		icon: 'icon-[simple-icons--linktree]',
		external: true
	},
	join: {
		href: 'https://nusu.co.uk/activities/view-society/131',
		label: 'Join NUCATS',
		icon: 'icon-[material-symbols--person-add-outline]',
		external: true
	},
	'students-union': {
		href: 'https://nusu.co.uk/',
		label: "Students' Union",
		icon: 'icon-[material-symbols--school-outline]',
		external: true
	},
	jack: {
		href: 'https://amnexya.com',
		label: 'Jack',
		external: true,
		openInNewTab: false
	},
	tyler: {
		href: 'https://www.linkedin.com/in/tyler-walker-502960430',
		label: 'Tyler',
		external: true,
		openInNewTab: false
	},
	'source-code': {
		href: 'https://github.com/nucats-soc/airport',
		label: 'GitHub',
		external: true,
		openInNewTab: false
	},
	'google-privacy': {
		href: 'https://policies.google.com/privacy?hl=en-US',
		label: 'Google for Google Maps',
		external: true
	},
	'notion-privacy': {
		href: 'https://privacycenter.notion.so/policies',
		label: 'Notion for Events Fetching and Committee Information',
		external: true
	},
	'calendar-feed': {
		href: 'https://nucats.org/events.ics',
		label: 'Events Calendar Feed',
		external: true,
		openInNewTab: false
	},
	'calendar-apple': {
		href: 'webcal://nucats.org/events.ics',
		label: 'Add to Calendar',
		external: true,
		openInNewTab: false
	},
	'calendar-google': {
		href: 'https://www.google.com/calendar/r?cid=webcal%3A%2F%2Fnucats.org%2Fevents.ics',
		label: 'Add to Calendar',
		external: true
	}
} satisfies Record<string, SiteLink>;

export type LinkId = keyof typeof linkDefinitions;

const links: Record<LinkId, SiteLink> = linkDefinitions;

export function getHref(id: LinkId): string {
	return links[id].href;
}

export function getLink(id: LinkId): SiteLink {
	return links[id];
}

export function getLinks(...ids: LinkId[]): SiteLink[] {
	return ids.map(getLink);
}

export const footerLinkIds = {
	pages: ['home', 'events', 'committee', 'terms', 'privacy'],
	socials: ['discord', 'instagram', 'github', 'linktree'],
	studentsUnion: ['join', 'students-union']
} satisfies Record<string, readonly LinkId[]>;
