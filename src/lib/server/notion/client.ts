import { Client } from '@notionhq/client';
import { NOTION_TOKEN } from '$app/env/private';

export const notion = new Client({ auth: NOTION_TOKEN ?? '' });
