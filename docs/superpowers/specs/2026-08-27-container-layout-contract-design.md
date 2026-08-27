# Container layout contract

## Problem

`Container.svelte` currently owns the content width, horizontal gutters, and bottom padding. Callers cannot see the vertical spacing in their markup, and the events page needs a `mobileGutter` mode to change a site-wide layout rule.

## Design

`Container` owns only the shared horizontal layout:

- `px-4 sm:px-8` gutters at every call site
- `max-w-225` centered content
- an optional `extraClass` string on the outer wrapper

`Container` does not apply default vertical spacing. Each caller passes an explicit class such as `py-8`, `pb-8`, or no vertical class.

```svelte
<Container extraClass="py-8">
	<!-- section content -->
</Container>
```

The component contract is:

```ts
interface Props {
	children?: Snippet;
	extraClass?: string;
}
```

The refactor removes `mobileGutter`. All callers receive the same responsive gutters.

## Caller migration

Content sections that relied on `Container` for spacing pass `extraClass="py-8"`. Callers with an existing spacing owner use that owner instead:

- The navbar passes `pb-8` because its header owns the top padding.
- The hero keeps spacing on its existing outer wrapper.
- The footer keeps spacing on its existing inner content wrapper.

This keeps vertical spacing next to the section that owns it.

## Alternatives

Wrapping each `Container` in a separate padded element would make ownership clear, but it would add markup at every call site. Repeating the width and gutter utilities would remove the component, but page widths could drift. An explicit `extraClass` keeps one width rule without hiding vertical spacing.

## Verification

Run `npm run check` and `npm run build`. Inspect the home, events, committee, and event-detail pages at mobile and desktop widths. Confirm that all page content uses the same horizontal gutters and that each caller supplies its intended vertical spacing.

## Risk

A caller can lose vertical spacing during migration. The caller audit and page inspection cover that risk.
