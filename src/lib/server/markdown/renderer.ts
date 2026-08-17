import rehypeSanitize, { defaultSchema, type Options as SanitizeSchema } from 'rehype-sanitize';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified, type PluggableList } from 'unified';
import { preprocessNotionMarkdown, remarkNotionBlocks } from './notion';

export const MARKDOWN_FLAVORS = ['standard', 'notion'] as const;

export type MarkdownFlavor = (typeof MARKDOWN_FLAVORS)[number];

/**
 * Extension points for source-specific Markdown syntax.
 *
 * Remark plugins run against the Markdown AST before it is converted to HTML.
 * Rehype plugins run against the HTML AST before the final sanitization pass.
 * This lets a future Notion extension translate custom Notion nodes without
 * allowing those extensions to bypass HTML sanitization.
 */
export interface MarkdownPipelineExtension {
	preprocess?: (markdown: string) => string;
	remarkPlugins?: PluggableList;
	rehypePlugins?: PluggableList;
}

export interface MarkdownRendererOptions extends MarkdownPipelineExtension {
	sanitizeSchema?: SanitizeSchema;
}

export type MarkdownRenderer = (markdown: string) => Promise<string>;

export function createMarkdownRenderer(options: MarkdownRendererOptions = {}): MarkdownRenderer {
	const preprocess = options.preprocess ?? ((markdown: string) => markdown);
	const processor = unified()
		.use(remarkParse)
		.use(remarkGfm)
		.use(options.remarkPlugins ?? [])
		.use(remarkRehype)
		.use(options.rehypePlugins ?? [])
		.use(rehypeSanitize, options.sanitizeSchema ?? defaultSchema)
		.use(rehypeStringify);

	return async (markdown) => String(await processor.process(preprocess(markdown)));
}

const notionSanitizeSchema: SanitizeSchema = {
	...defaultSchema,
	tagNames: [...(defaultSchema.tagNames ?? []), 'aside'],
	attributes: {
		...defaultSchema.attributes,
		aside: [['className', 'notion-callout', /^notion-callout--[a-z]+$/]],
		div: [...(defaultSchema.attributes?.div ?? []), ['className', 'notion-callout__content']]
	}
};

const renderers: Record<MarkdownFlavor, MarkdownRenderer> = {
	standard: createMarkdownRenderer(),
	notion: createMarkdownRenderer({
		preprocess: preprocessNotionMarkdown,
		remarkPlugins: [remarkNotionBlocks],
		rehypePlugins: [],
		sanitizeSchema: notionSanitizeSchema
	})
};

export function isMarkdownFlavor(value: unknown): value is MarkdownFlavor {
	return typeof value === 'string' && MARKDOWN_FLAVORS.some((flavor) => flavor === value);
}

export function renderMarkdown(markdown: string, flavor: MarkdownFlavor = 'standard') {
	return renderers[flavor](markdown);
}
