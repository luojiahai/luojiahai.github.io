# Multiple Sidebars Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the flat sidebar arrays in `en/config.ts` and `zh/config.ts` with path-keyed sidebar objects so each section (Posts, Life, Work) shows only its own navigation, with the Posts sidebar auto-discovered from the filesystem.

**Architecture:** VitePress supports a path-keyed `sidebar` object (`{ '/posts/': [...], '/life/': [...] }`) where each key matches a URL prefix. Posts items are generated at build time using Node.js `fs.readdirSync` in `en/config.ts`, reading `en/posts/*.md` and extracting `# H1` headings for labels. Life and Work entries remain static.

**Tech Stack:** VitePress, TypeScript, Node.js `fs`/`path`/`url` built-ins.

---

### Task 1: Update `en/config.ts` — path-keyed sidebar with dynamic posts

**Files:**
- Modify: `en/config.ts`

- [ ] **Step 1: Add Node.js imports at the top of `en/config.ts`**

Add these three imports after the existing vitepress import:

```ts
import { readdirSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
```

Full file top after change:

```ts
import { defineConfig, type DefaultTheme } from "vitepress";
import { readdirSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
```

- [ ] **Step 2: Replace the `sidebar()` function**

Replace the entire existing `sidebar()` function with:

```ts
function sidebar(): DefaultTheme.Sidebar {
  return {
    "/posts/": [{ text: "Posts", items: postsSidebarItems() }],
    "/life/": [{ text: "Life", collapsed: false, base: "/life", items: [{ text: "Use", link: "/use" }] }],
    "/work/": [
      {
        text: "Work",
        collapsed: false,
        base: "/work",
        items: [
          { text: "Resume", link: "/resume" },
          { text: "Portfolio", link: "/portfolio" },
        ],
      },
    ],
  };
}

function postsSidebarItems(): DefaultTheme.SidebarItem[] {
  const postsDir = resolve(__dirname, "posts");
  return readdirSync(postsDir)
    .filter((f) => f.endsWith(".md") && f !== "index.md")
    .map((f) => {
      const src = readFileSync(resolve(postsDir, f), "utf-8");
      const title = src.match(/^#\s+(.+)/m)?.[1].trim() ?? f.replace(/\.md$/, "");
      const slug = f.replace(/\.md$/, "");
      return { text: title, link: `/posts/${slug}` };
    });
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `pnpm build`
Expected: build completes without TypeScript errors. If `__dirname` or `import.meta.url` errors appear, confirm the tsconfig has `"moduleResolution": "bundler"` or `"node16"`.

- [ ] **Step 4: Commit**

```bash
git add en/config.ts
git commit -m "feat: convert en sidebar to path-keyed with dynamic posts discovery"
```

---

### Task 2: Update `zh/config.ts` — path-keyed sidebar

**Files:**
- Modify: `zh/config.ts`

- [ ] **Step 1: Replace the `sidebar()` function in `zh/config.ts`**

Replace the entire existing `sidebar()` function with:

```ts
function sidebar(): DefaultTheme.Sidebar {
  return {
    "/zh/life/": [
      {
        text: "生活",
        collapsed: false,
        base: "/zh/life",
        items: [{ text: "使用", link: "/use" }],
      },
    ],
    "/zh/work/": [
      {
        text: "工作",
        collapsed: false,
        base: "/zh/work",
        items: [
          { text: "简历", link: "/resume" },
          { text: "项目", link: "/portfolio" },
        ],
      },
    ],
  };
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `pnpm build`
Expected: build completes without errors.

- [ ] **Step 3: Commit**

```bash
git add zh/config.ts
git commit -m "feat: convert zh sidebar to path-keyed object"
```

---

### Task 3: Remove `sidebar: false` from post frontmatter

**Files:**
- Modify: `en/posts/index.md`
- Modify: `en/posts/inside-claude-code.md`
- Modify: `en/posts/mastering-claude-code.md`

- [ ] **Step 1: Remove `sidebar: false` from `en/posts/index.md`**

Before:
```yaml
---
sidebar: false
lastUpdated: false
editLink: false
prev: false
next: false
---
```

After:
```yaml
---
lastUpdated: false
editLink: false
prev: false
next: false
---
```

- [ ] **Step 2: Remove `sidebar: false` from `en/posts/inside-claude-code.md`**

Before:
```yaml
---
description: "Claude Code is built on roughly 512,000 lines of code. A look at how each module works: the agent loop, tool system, memory, context compression, and permission layer."
sidebar: false
prev: false
next: false
---
```

After:
```yaml
---
description: "Claude Code is built on roughly 512,000 lines of code. A look at how each module works: the agent loop, tool system, memory, context compression, and permission layer."
prev: false
next: false
---
```

- [ ] **Step 3: Remove `sidebar: false` from `en/posts/mastering-claude-code.md`**

Before:
```yaml
---
description: "Distilled from Mastering Claude Code in 30 minutes by Boris Cherny. Learn advanced features, shortcuts, and workflows to get the most from Claude Code."
sidebar: false
prev: false
next: false
---
```

After:
```yaml
---
description: "Distilled from Mastering Claude Code in 30 minutes by Boris Cherny. Learn advanced features, shortcuts, and workflows to get the most from Claude Code."
prev: false
next: false
---
```

- [ ] **Step 4: Build and verify**

Run: `pnpm build`
Expected: build succeeds with no errors.

- [ ] **Step 5: Commit**

```bash
git add en/posts/index.md en/posts/inside-claude-code.md en/posts/mastering-claude-code.md
git commit -m "feat: enable sidebar on posts pages"
```

---

### Task 4: Visual verification

**Files:** none (read-only verification)

- [ ] **Step 1: Start dev server**

Run: `pnpm dev`

- [ ] **Step 2: Check Posts sidebar**

Navigate to `/posts/` — sidebar should show a "Posts" group listing "Inside Claude Code" and "Mastering Claude Code". Navigate to `/posts/inside-claude-code` — same sidebar should appear.

- [ ] **Step 3: Check Life sidebar**

Navigate to `/life/use` — sidebar should show only the "Life" group with "Use". No "Work" entries visible.

- [ ] **Step 4: Check Work sidebar**

Navigate to `/work/resume` — sidebar should show only the "Work" group with "Resume" and "Portfolio". No "Life" or "Posts" entries visible.

- [ ] **Step 5: Check zh sidebars**

Navigate to `/zh/life/use` — sidebar should show "生活" group only. Navigate to `/zh/work/resume` — sidebar should show "工作" group only.
