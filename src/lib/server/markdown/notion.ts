import type {
	Blockquote,
	Paragraph,
	Parent,
	PhrasingContent,
	Root,
	RootContent,
	Text
} from 'mdast';
import type { Plugin } from 'unified';

const NOTION_LINE_BREAK = /^<br\s*\/?>$/i;
const NOTION_EMPTY_BLOCK = /^<empty-block\s*\/>$/i;
const NOTION_CALLOUT_OPEN = /^<callout(?:\s+([^>]*))?>$/i;
const NOTION_CALLOUT_CLOSE = /^<\/callout>$/i;
const NOTION_CALLOUT_MARKER = /^\[!NOTION_CALLOUT color=([a-z_]+)\]$/;
const NOTION_CALLOUT_COLORS = new Set([
	'default',
	'gray',
	'brown',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple',
	'pink',
	'red'
]);

function readAttribute(attributes: string, name: string): string | undefined {
	const match = attributes.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`));
	return match?.[1];
}

function removeChildIndent(line: string): string {
	if (line.startsWith('\t')) return line.slice(1);
	if (line.startsWith('    ')) return line.slice(4);
	return line;
}

function normalizeCalloutColor(color: string | undefined): string {
	const normalized = color?.replace(/_bg$/, '') ?? 'default';
	return NOTION_CALLOUT_COLORS.has(normalized) ? normalized : 'default';
}

function convertCallouts(lines: string[]): string[] {
	const converted: string[] = [];

	for (let index = 0; index < lines.length; index += 1) {
		const opening = lines[index]?.trim().match(NOTION_CALLOUT_OPEN);
		if (!opening) {
			converted.push(lines[index] ?? '');
			continue;
		}

		let depth = 1;
		let closingIndex = index + 1;

		for (; closingIndex < lines.length; closingIndex += 1) {
			const line = lines[closingIndex]?.trim() ?? '';
			if (NOTION_CALLOUT_OPEN.test(line)) depth += 1;
			if (NOTION_CALLOUT_CLOSE.test(line)) depth -= 1;
			if (depth === 0) break;
		}

		if (depth !== 0) {
			converted.push(lines[index] ?? '');
			continue;
		}

		const attributes = opening[1] ?? '';
		const color = normalizeCalloutColor(readAttribute(attributes, 'color'));
		const children = convertCallouts(lines.slice(index + 1, closingIndex).map(removeChildIndent));

		if (converted.length > 0 && converted.at(-1) !== '') converted.push('');
		converted.push(`> [!NOTION_CALLOUT color=${color}]`);
		for (const child of children) {
			converted.push(child ? `> ${child}` : '>');
		}
		converted.push('');

		index = closingIndex;
	}

	return converted;
}

export function preprocessNotionMarkdown(markdown: string): string {
	return convertCallouts(markdown.split(/\r?\n/)).join('\n');
}

function isParent(node: RootContent): node is RootContent & Parent {
	return 'children' in node;
}

function replaceInlineBreaks(node: PhrasingContent): PhrasingContent {
	if (node.type === 'html' && NOTION_LINE_BREAK.test(node.value.trim())) {
		return { type: 'break' };
	}

	if ('children' in node) {
		node.children = node.children.map(replaceInlineBreaks);
	}

	return node;
}

function splitParagraph(paragraph: Paragraph): Paragraph[] {
	const paragraphs: Paragraph[] = [{ type: 'paragraph', children: [] }];

	for (const child of paragraph.children) {
		if (child.type !== 'text' || !child.value.includes('\n')) {
			paragraphs.at(-1)?.children.push(replaceInlineBreaks(child));
			continue;
		}

		const lines = child.value.split(/\r?\n/);

		for (const [index, line] of lines.entries()) {
			if (line) {
				const text: Text = { ...child, value: line };
				paragraphs.at(-1)?.children.push(text);
			}

			if (index < lines.length - 1) {
				paragraphs.push({ type: 'paragraph', children: [] });
			}
		}
	}

	return paragraphs.filter((node) => node.children.length > 0);
}

function normalizeChildren(parent: Parent): void {
	const children: RootContent[] = [];

	for (const child of parent.children) {
		if (child.type === 'html' && NOTION_EMPTY_BLOCK.test(child.value.trim())) {
			children.push({
				type: 'paragraph',
				children: [{ type: 'break' }]
			});
			continue;
		}

		if (child.type === 'paragraph') {
			children.push(...splitParagraph(child));
			continue;
		}

		if (isParent(child)) {
			normalizeChildren(child);
		}

		children.push(child);
	}

	parent.children = children;
}

function transformCallouts(parent: Parent): void {
	for (const child of parent.children) {
		if (child.type !== 'blockquote') {
			if (isParent(child)) transformCallouts(child);
			continue;
		}

		const callout = child as Blockquote;
		const marker = callout.children[0];
		const markerText =
			marker?.type === 'paragraph' &&
			marker.children.length === 1 &&
			marker.children[0]?.type === 'text'
				? marker.children[0].value.match(NOTION_CALLOUT_MARKER)
				: null;

		if (!markerText) {
			transformCallouts(callout);
			continue;
		}

		const color = normalizeCalloutColor(markerText[1]);

		callout.data = {
			hName: 'aside',
			hProperties: { className: ['notion-callout', `notion-callout--${color}`] }
		};
		callout.children = callout.children.slice(1);
		transformCallouts(callout);
	}
}

/**
 * Adapts Notion's enhanced Markdown block boundaries to mdast.
 *
 * Notion emits paragraph blocks on consecutive lines and represents line
 * breaks inside a paragraph with a literal <br> tag. CommonMark instead joins
 * consecutive text lines and ignores raw HTML in our safe rendering pipeline.
 */
export const remarkNotionBlocks: Plugin<[], Root> = () => (tree) => {
	normalizeChildren(tree);
	transformCallouts(tree);
};
