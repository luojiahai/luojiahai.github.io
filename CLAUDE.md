# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server with hot-reload
pnpm build      # Build production site to .vitepress/dist
pnpm preview    # Preview the built site locally
pnpm format     # Format all files with Prettier
```

Pre-commit hooks run Prettier via lint-staged via `simple-git-hooks` (not Husky).

## Architecture

This is a **VitePress** personal portfolio site with bilingual support (English/Chinese), deployed to GitHub Pages at luojiahai.com.

### Content Organization

Content is split by locale:
- `en/` — English pages and data
- `zh/` — Chinese pages and data
- `root/` — Locale-agnostic pages (e.g., parrot easter egg)

Each locale has `index.md` (home), `resume.md`, `use.md`, and a `data/` directory with `resume.json` for structured content.

VitePress rewrites `/en/*` → `/*`, so English is served at root; Chinese at `/zh/`.

### Configuration

- `.vitepress/config.ts` — main VitePress config (locales, markdown theme, sitemap)
- `en/config.ts`, `zh/config.ts` — per-locale nav, footer, and UI strings

### Custom Vue Components

All components live in `components/` and are globally registered in `.vitepress/theme/index.ts`:

- `Layout.vue` — custom theme layout in `.vitepress/theme/`; wraps DefaultTheme's `<Layout>` and injects a typewriter animation on the home hero targeting `.VPHome .VPHero .thinking`
- `<Resume>` — renders resume data from `data/resume.json`
- `<Terminal>` — terminal-style display
- `<Parrot>` — utility/UI components

### Styling

- `.vitepress/theme/custom.css` — brand token overrides and structural CSS overrides on top of VitePress defaults

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`.
