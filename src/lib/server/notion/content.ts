import {
	collectPaginatedAPI,
	isFullPage,
	type PageObjectResponse,
	type QueryDataSourceParameters,
	type QueryDataSourceResponse
} from '@notionhq/client';
import { cache, EVENT_CACHE_TTL } from '$lib/server/cache';

import { notion } from './client';

type DataSourceResults = QueryDataSourceResponse['results'];
type DataSourceQuery = Omit<QueryDataSourceParameters, 'start_cursor'>;
type PageParser<T> = (page: PageObjectResponse) => T | Promise<T>;

function parsePages<T>(results: DataSourceResults, parsePage: PageParser<T>): Promise<T[]> {
	return Promise.all(results.filter(isFullPage).map(parsePage));
}

export async function queryDataSource<T>(
	query: DataSourceQuery,
	parsePage: PageParser<T>,
	paginate = false
): Promise<T[]> {
	const results = paginate
		? await collectPaginatedAPI(notion.dataSources.query, query)
		: (await notion.dataSources.query(query)).results;

	return parsePages(results, parsePage);
}

export async function retrievePage<T>(pageId: string, parsePage: PageParser<T>): Promise<T | null> {
	const page = await notion.pages.retrieve({ page_id: pageId });

	return isFullPage(page) ? await parsePage(page) : null;
}

export async function retrievePageMarkdown(pageId: string): Promise<string> {
	return cache.wrap(
		`pages:${pageId}:markdown`,
		async () => {
			const response = await notion.pages.retrieveMarkdown({
				page_id: pageId
			});

			return response.markdown;
		},
		EVENT_CACHE_TTL
	);
}
