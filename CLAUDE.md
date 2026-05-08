# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server with hot-reload
pnpm build      # Build production site to .vitepress/dist
pnpm preview    # Preview the built site locally
pnpm format     # Format all files with Prettier
pnpm lint       # Lint with ESLint (Vue + TypeScript + Prettier integration)
pnpm debug      # Build with DEBUG=true then preview (for troubleshooting build output)
```

Pre-commit hooks run Prettier on all files and `eslint --fix` on `*.ts,*.vue` via lint-staged + `simple-git-hooks` (not Husky).
Prettier config: `printWidth: 120`, double quotes, trailing commas, semicolons.

## Architecture

This is a **VitePress** personal portfolio site with bilingual support (English/Chinese), deployed to GitHub Pages at luojiahai.com.

### Content Organization

Content is split by locale:

- `en/` — English pages and data
- `zh/` — Chinese pages and data
- `root/` — Locale-agnostic pages (e.g., parrot easter egg)

Content is organized into subdirectories:

- `en/blog/` — blog posts (English-only; `blog.data.ts` loads `en/blog/*.md` and `en/blog/*/*.md`)
- `en/miscellaneous/`, `zh/miscellaneous/` — `resume.md`, `portfolio.md`, `use.md` (loaded by `misc.data.ts`)

Resume content is embedded directly in `Resume.vue` (a `RESUME` constant keyed by locale), not in an external data file.

VitePress rewrites `/en/*` → `/*`, so English is served at root; Chinese at `/zh/`.

### Configuration

- `.vitepress/config.ts` — main VitePress config (locales, markdown theme, sitemap)
- `en/config.ts`, `zh/config.ts` — per-locale nav, footer, and UI strings

### Custom Vue Components

All components live in `components/` and are globally registered in `.vitepress/theme/index.ts`:

- `Layout.vue` — custom theme layout in `.vitepress/theme/`; injects a lottie animation (`/lottie-overview.json` via `lottie-web`) into `.VPHome .VPHero .container` and a typewriter on `.VPHome .VPHero .thinking`; both are locale-aware
- `<Resume>` — renders resume (data embedded in component as a `RESUME` constant, keyed by locale)
- `<Portfolio>` — project/portfolio display
- `<Blog>` — blog posts listing
- `<Terminal>` — terminal-style display
- `<Parrot>` — easter egg / utility component

### Styling

- `.vitepress/theme/custom.css` — brand token overrides and structural CSS overrides on top of VitePress defaults
- `.vitepress/theme/custom-fonts.css` — font-face declarations for custom fonts

### Deployment

GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on every push to `main`.
