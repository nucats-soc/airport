import materialSymbolsJson from '@iconify/json/json/material-symbols.json';
import type { IconifyJSON } from '@iconify/types';

const FALLBACK_SYMBOL = 'event';
const materialSymbols = materialSymbolsJson as IconifyJSON;

function iconNameOf(displayName: string | null): string {
	return (
		displayName
			?.trim()
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-+|-+$/g, '') || FALLBACK_SYMBOL
	);
}

export function renderMaterialSymbol(displayName: string | null): string {
	const iconName = iconNameOf(displayName);
	const icon = materialSymbols.icons[iconName] ?? materialSymbols.icons[FALLBACK_SYMBOL];
	const width = icon.width ?? materialSymbols.width ?? 24;
	const height = icon.height ?? materialSymbols.height ?? 24;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 ${width} ${height}" aria-hidden="true" focusable="false">${icon.body}</svg>`;
}
