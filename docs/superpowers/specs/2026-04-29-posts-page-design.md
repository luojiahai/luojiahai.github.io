# Posts Page Design

**Date:** 2026-04-29
**Status:** Approved

## Goal

Replace the plain markdown list at `en/posts/index.md` with a styled `PostList` Vue component that shows each post's title, date, and description. Style must be consistent with the existing `Portfolio.vue` and `Resume.vue` components.

## Scope

- English only (`en/posts/` only — no zh equivalent at this time)
- No filtering, tagging, or pagination — flat list sorted newest-first

## Architecture

Five files are created or modified:

| File | Action | Purpose |
|---|---|---|
| `en/posts/posts.data.ts` | Create | VitePress data loader — reads frontmatter from all `en/posts/*.md` files, returns sorted array |
| `components/PostList.vue` | Create | Globally registered Vue component — renders the post list |
| `en/posts/index.md` | Modify | Add `<script setup>` to import loader data and pass to `<PostList :posts="posts" />` |
| `.vitepress/theme/index.ts` | Modify | Register `PostList` globally |
| `en/posts/*.md` (each post) | Modify | Add `date` and `description` frontmatter |

## Data Loader (`posts.data.ts`)

Uses VitePress's `createContentLoader` to glob `en/posts/*.md`, excluding `index.md`. Reads `frontmatter.date` and `frontmatter.description` from each file. Sorts by date descending (newest first). Exports a typed array.

```ts
export type Post = {
  title: string
  url: string
  date: string        // ISO date string, e.g. "2025-01-15"
  description: string
}
```

The `title` is parsed from the raw markdown source: the data loader passes `{ includeSrc: true }` to `createContentLoader`, then extracts the first `# Heading` line via a regex (`/^#\s+(.+)/m`). This avoids requiring a separate `title:` frontmatter field on each post.

## Component (`PostList.vue`)

- Accepts a `posts: Post[]` prop
- Renders a section header "All Posts" (14px, uppercase, letter-spaced, `var(--vp-c-text-2)`, bottom border using `var(--vp-c-divider)`) — matching `Resume.vue`'s `.section-title`
- Renders a `<ul>` with `gap: 20px` between items — matching `Portfolio.vue`'s `.item-list`
- Each `<li>` has `border-left: 2px solid var(--vp-c-brand-1)` and `padding-left: 16px` — matching both `Portfolio.vue` and `Resume.vue`
- Item header row: title link (left, `font-weight: 600`, `var(--vp-c-text-1)`, navigates to post URL) and date (right, `font-size: 14px`, `font-style: italic`, `var(--vp-c-text-2)`)
- Description below the header: `font-size: 14px`, `var(--vp-c-text-2)`, `margin: 4px 0 0`
- Mobile (`max-width: 639px`): header row switches to `flex-direction: column` with `gap: 2px` — matching `Portfolio.vue`'s responsive rule

## Frontmatter on Posts

Each `en/posts/*.md` file gains:

```yaml
---
date: YYYY-MM-DD
description: One or two sentence summary of the post.
---
```

## Integration (`en/posts/index.md`)

```md
---
---
<script setup>
import { data as posts } from './posts.data.ts'
</script>

# Posts

<PostList :posts="posts" />
```

The `# Posts` heading remains so VitePress renders it as the page title. The component renders below it.

## Style Consistency Checklist

All of the following match `Portfolio.vue` and `Resume.vue` exactly:

- `border-left: 2px solid var(--vp-c-brand-1)` with `padding-left: 16px` on items
- `gap: 20px` between list items
- Section title: `font-size: 14px`, `font-weight: 700`, `letter-spacing: 0.14em`, `text-transform: uppercase`, `color: var(--vp-c-text-2)`, `border-bottom: 1px solid var(--vp-c-divider)`
- Secondary text at `font-size: 14px` using `var(--vp-c-text-2)`
- Primary label at `font-weight: 600` using `var(--vp-c-text-1)`
- Responsive column layout at `max-width: 639px`
