import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	NOTION_TOKEN: { schema: (input) => input ?? '' },
	NOTION_COMMITTEE_DATASOURCE: { schema: (input) => input ?? '' },
	NOTION_EVENT_DATASOURCE: { schema: (input) => input ?? '' },
	NOTION_PLACE_DATASOURCE: { schema: (input) => input ?? '' }
});
