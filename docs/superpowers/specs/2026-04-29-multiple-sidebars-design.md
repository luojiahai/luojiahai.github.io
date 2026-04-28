# Multiple Sidebars Design

**Date:** 2026-04-29

## Goal

Replace the current flat sidebar array with a path-keyed sidebar object so each section (Posts, Life, Work) shows only its own navigation items. Posts sidebar items are auto-discovered from the filesystem so no manual update is needed when new posts are added.

## Architecture

### `en/config.ts` — sidebar function

Change `sidebar()` return type from `DefaultTheme.SidebarItem[]` to `DefaultTheme.Sidebar` (the path-keyed object form).

```ts
function sidebar(): DefaultTheme.Sidebar {
  return {
    '/posts/': [{ text: 'Posts', items: postsSidebarItems() }],
    '/life/':  [{ text: 'Life',  items: [{ text: 'Use', link: '/life/use' }] }],
    '/work/':  [{ text: 'Work',  items: [{ text: 'Resume', link: '/work/resume' }, { text: 'Portfolio', link: '/work/portfolio' }] }],
  }
}
```

### `postsSidebarItems()` helper

Reads `en/posts/*.md` at build time using `fs.readdirSync`. Excludes `index.md` and `posts.data.ts`. For each file, extracts the `# H1` heading via regex to use as the sidebar label. Maps to link `/posts/<slug>` (filename without `.md`).

### `zh/config.ts` — sidebar function

Same path-keyed refactor for the existing Life and Work sections. No posts sidebar for zh yet (no `zh/posts/` directory exists); add it when that content is created.

```ts
function sidebar(): DefaultTheme.Sidebar {
  return {
    '/zh/life/': [{ text: '生活', items: [{ text: '使用', link: '/zh/life/use' }] }],
    '/zh/work/': [{ text: '工作', items: [{ text: '简历', link: '/zh/work/resume' }, { text: '项目', link: '/zh/work/portfolio' }] }],
  }
}
```

### Content frontmatter

Remove `sidebar: false` from:
- `en/posts/index.md`
- `en/posts/inside-claude-code.md`
- `en/posts/mastering-claude-code.md`

## Constraints

- No new dependencies.
- Posts sidebar titles are sourced from the `# H1` heading in each file, falling back to the filename slug if no heading is found.
- The `posts.data.ts` client-side loader is unchanged.
