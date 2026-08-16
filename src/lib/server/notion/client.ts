import { Client } from '@notionhq/client';
import { env } from '$env/dynamic/private';

if (!env.NOTION_TOKEN) {
	throw new Error('NOTION_TOKEN environment variable is not set');
}

export const notion = new Client({
	auth: env.NOTION_TOKEN
});
