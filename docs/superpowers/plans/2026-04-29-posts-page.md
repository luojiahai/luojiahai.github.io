# Posts Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the plain markdown list at `en/posts/index.md` with a styled `PostList` Vue component that renders each post's title, date, and description, consistent with the existing `Portfolio.vue` and `Resume.vue` components.

**Architecture:** A VitePress data loader (`en/posts/posts.data.ts`) reads `date` and `description` frontmatter from each post at build time and exports a typed, date-sorted `Post[]` array. A globally registered `PostList.vue` component accepts that array as a prop and renders it using the same left-border-accent pattern as the existing components. The `en/posts/index.md` page imports the loader output and passes it to the component.

**Tech Stack:** VitePress `createContentLoader`, Vue 3 `<script setup>`, TypeScript, scoped CSS using VitePress design tokens.

---

### Task 1: Add frontmatter to existing posts

**Files:**
- Modify: `en/posts/mastering-claude-code.md`
- Modify: `en/posts/inside-claude-code.md`

- [ ] **Step 1: Add frontmatter to `mastering-claude-code.md`**

The file currently starts with `# Mastering Claude Code`. Prepend the following YAML block — do not change anything else in the file:

```md
---
date: 2026-04-28
description: My distillation of Boris Cherny's 30-minute talk on using Claude Code well — practical tips, concrete prompts, and techniques for getting the most out of agentic coding.
---

# Mastering Claude Code
```

- [ ] **Step 2: Add frontmatter to `inside-claude-code.md`**

The file currently starts with `# Inside Claude Code`. Prepend:

```md
---
date: 2026-04-21
description: Claude Code is built on 1,906 TypeScript source files and roughly 512,000 lines of code. A look at how each module works — the agent loop, tool system, memory, context compression, and permission layer.
---

# Inside Claude Code
```

- [ ] **Step 3: Commit**

```bash
git add en/posts/mastering-claude-code.md en/posts/inside-claude-code.md
git commit -m "feat: add date and description frontmatter to posts"
```

---

### Task 2: Create the VitePress data loader

**Files:**
- Create: `en/posts/posts.data.ts`

- [ ] **Step 1: Create `en/posts/posts.data.ts`**

```ts
import { createContentLoader } from "vitepress";

export type Post = {
  title: string;
  url: string;
  date: string;
  description: string;
};

declare const data: Post[];
export { data };

export default createContentLoader("en/posts/*.md", {
  includeSrc: true,
  transform(rawData): Post[] {
    return rawData
      .filter((item) => !item.url.endsWith("/posts/"))
      .map((item) => ({
        title: item.src?.match(/^#\s+(.+)/m)?.[1].trim() ?? "",
        url: item.url.replace(/^\/en\//, "/"),
        date: item.frontmatter.date as string,
        description: item.frontmatter.description as string,
      }))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
});
```

Notes on each line of logic:
- `.filter(item => !item.url.endsWith('/posts/'))` — excludes `index.md` itself from the list
- `item.src?.match(/^#\s+(.+)/m)?.[1].trim()` — extracts the first `# Heading` from raw markdown source, so posts don't need a separate `title:` frontmatter field
- `.replace(/^\/en\//, '/')` — strips the `/en/` prefix from the URL to match the VitePress rewrite rule (`"en/:rest*": ":rest*"`) in `.vitepress/config.ts:22`
- `.sort(...)` — newest post first

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm build 2>&1 | head -40
```

Expected: build completes without TypeScript errors. If you see errors about `createContentLoader` or missing types, run `pnpm install` first.

- [ ] **Step 3: Commit**

```bash
git add en/posts/posts.data.ts
git commit -m "feat: add VitePress data loader for posts"
```

---

### Task 3: Create the PostList component

**Files:**
- Create: `components/PostList.vue`

- [ ] **Step 1: Create `components/PostList.vue`**

```vue
<script setup lang="ts">
type Post = {
  title: string;
  url: string;
  date: string;
  description: string;
};

defineProps<{
  posts: Post[];
}>();
</script>

<template>
  <div class="post-list">
    <div class="section-title">All Posts</div>
    <ul class="item-list">
      <li v-for="post in posts" :key="post.url" class="item">
        <div class="item-header">
          <a :href="post.url" class="item-title">{{ post.title }}</a>
          <span class="item-date">{{ post.date }}</span>
        </div>
        <p class="item-description">{{ post.description }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.post-list {
  margin: 0 auto 32px;
}

.section-title {
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vp-c-text-2);
  margin-top: 0;
  padding-bottom: 16px;
  border-top: none;
  border-bottom: 1px solid var(--vp-c-divider);
  line-height: 1;
}

.item-list {
  list-style-type: none;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
}

.item {
  border-left: 2px solid var(--vp-c-brand-1);
  padding-left: 16px;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.item-title {
  font-weight: 600;
  color: var(--vp-c-text-1);
  text-decoration: none;
  flex: 1;
  min-width: 0;
}

.item-title:hover {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.item-date {
  font-size: 14px;
  font-style: italic;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  margin-left: 12px;
}

.item-description {
  margin: 4px 0 0;
  color: var(--vp-c-text-2);
  font-size: 14px;
}

@media (max-width: 639px) {
  .item-header {
    flex-direction: column;
    gap: 2px;
  }

  .item-date {
    white-space: normal;
    margin-left: 0;
  }
}
</style>
```

- [ ] **Step 2: Commit**

```bash
git add components/PostList.vue
git commit -m "feat: add PostList component"
```

---

### Task 4: Register the component and wire up the index page

**Files:**
- Modify: `.vitepress/theme/index.ts`
- Modify: `en/posts/index.md`

- [ ] **Step 1: Register PostList in `.vitepress/theme/index.ts`**

Current file at `.vitepress/theme/index.ts`:

```ts
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import "./custom-fonts.css";
import Layout from "./Layout.vue";
import Parrot from "../../components/Parrot.vue";
import Portfolio from "../../components/Portfolio.vue";
import Resume from "../../components/Resume.vue";
import Terminal from "../../components/Terminal.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("Parrot", Parrot);
    app.component("Portfolio", Portfolio);
    app.component("Resume", Resume);
    app.component("Terminal", Terminal);
  },
} satisfies Theme;
```

Replace with:

```ts
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import "./custom.css";
import "./custom-fonts.css";
import Layout from "./Layout.vue";
import Parrot from "../../components/Parrot.vue";
import Portfolio from "../../components/Portfolio.vue";
import PostList from "../../components/PostList.vue";
import Resume from "../../components/Resume.vue";
import Terminal from "../../components/Terminal.vue";

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component("Parrot", Parrot);
    app.component("Portfolio", Portfolio);
    app.component("PostList", PostList);
    app.component("Resume", Resume);
    app.component("Terminal", Terminal);
  },
} satisfies Theme;
```

- [ ] **Step 2: Update `en/posts/index.md`**

Replace the entire file with:

```md
---
---

<script setup>
import { data as posts } from './posts.data.ts'
</script>

# Posts

<PostList :posts="posts" />
```

The empty `---\n---` frontmatter block ensures VitePress processes the file correctly. The `# Posts` heading is kept so VitePress renders it as the page title and document title.

- [ ] **Step 3: Start the dev server and verify**

```bash
pnpm dev
```

Open `http://localhost:5173/posts/` in a browser. Verify:

1. The page title "Posts" appears
2. The "ALL POSTS" section header is visible with a bottom border
3. Both posts appear as list items with a left brand-colored border
4. Each item shows: title (bold, links to the post), date (right-aligned, italic), description (below, 14px muted)
5. Clicking a post title navigates to the post page
6. Toggle dark mode (sun/moon icon in nav) — colors adapt correctly using CSS variables
7. At mobile width (< 640px, use browser devtools), date drops below the title in a stacked layout

- [ ] **Step 4: Commit**

```bash
git add .vitepress/theme/index.ts en/posts/index.md
git commit -m "feat: wire up PostList component on posts index page"
```
