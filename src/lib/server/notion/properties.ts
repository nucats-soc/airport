import type { PageObjectResponse } from '@notionhq/client';

type PageProperties = PageObjectResponse['properties'];
type PageProperty = PageProperties[string] | undefined;

export function startDateOf(property: PageProperty): Date | null {
	if (!property || property.type !== 'date' || !property.date) {
		return null;
	}

	return new Date(property.date.start);
}

export function endDateOf(property: PageProperty): Date | null {
	if (!property || property.type !== 'date' || !property.date || !property.date.end) {
		return null;
	}

	return new Date(property.date.end);
}

export function urlOf(property: PageProperty): string | null {
	if (!property || property.type !== 'url') {
		return null;
	}

	return property.url;
}

export function statusOf(property: PageProperty): string | null {
	if (!property || property.type !== 'status' || !property.status) {
		return null;
	}

	return property.status.name;
}

export function statusColorOf(property: PageProperty): string | null {
	if (!property || property.type !== 'status' || !property.status) {
		return null;
	}

	return property.status.color;
}

export function selectColorOf(property: PageProperty): string | null {
	if (!property || property.type !== 'select' || !property.select) {
		return null;
	}

	return property.select.color;
}

export function selectNameOf(property: PageProperty): string | null {
	if (!property || property.type !== 'select' || !property.select) {
		return null;
	}

	return property.select.name;
}

export function numberOf(property: PageProperty): number | null {
	if (!property || property.type !== 'number') {
		return null;
	}

	return property.number;
}

export function relationIdOf(property: PageProperty): string | null {
	if (!property || property.type !== 'relation') {
		return null;
	}

	return property.relation[0]?.id ?? null;
}

export function textOf(property: PageProperty): string | null {
	if (!property) {
		return null;
	}

	if (property.type === 'title') {
		return property.title.map((rich) => rich.plain_text).join(' ');
	}

	if (property.type === 'rich_text') {
		return property.rich_text.map((rich) => rich.plain_text).join(' ');
	}

	return null;
}
