# Hero Lottie Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add the Lottie animation as a decorative right-aligned background layer inside `.VPHome .VPHero`, layered over the existing CSS grid pattern.

**Architecture:** Download the JSON to `public/` so VitePress serves it statically. Install `lottie-web` as a production dep. On mount in `Layout.vue`, inject a `.hero-lottie-bg` div into `.VPHero` and initialise a Lottie instance on it; clean up the instance on route change alongside the existing typewriter cleanup. CSS positions the div absolutely, right-aligned, `pointer-events: none`.

**Tech Stack:** lottie-web, Vue 3 Composition API, VitePress, CSS

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `public/lottie-overview.json` | Create | Static animation asset |
| `package.json` | Modify | Add `lottie-web` production dependency |
| `.vitepress/theme/Layout.vue` | Modify | Inject Lottie div on mount, destroy on route change |
| `.vitepress/theme/custom.css` | Modify | Position `.hero-lottie-bg` absolutely, right-aligned; stack hero content above it |

---

### Task 1: Download the animation JSON

**Files:**
- Create: `public/lottie-overview.json`

- [ ] **Step 1: Download JSON to public/**

```bash
curl -L "https://cdn.prod.website-files.com/6889473510b50328dbb70ae6/68c004190c4e4446cd87c39e_Overview.json" \
  -o public/lottie-overview.json
```

- [ ] **Step 2: Verify file downloaded correctly**

```bash
head -c 100 public/lottie-overview.json
```

Expected: starts with `{"v":"5.12.1"` (Lottie JSON header)

- [ ] **Step 3: Commit**

```bash
git add public/lottie-overview.json
git commit -m "feat: add lottie overview animation asset"
```

---

### Task 2: Install lottie-web

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install lottie-web**

```bash
pnpm add lottie-web
```

- [ ] **Step 2: Verify types are available**

```bash
node -e "const l = require('./node_modules/lottie-web/build/player/lottie.js'); console.log(typeof l.loadAnimation)"
```

Expected: `function`

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "feat: add lottie-web dependency"
```

---

### Task 3: Add CSS for the Lottie background layer

**Files:**
- Modify: `.vitepress/theme/custom.css:456-464`

- [ ] **Step 1: Add position context and hero-lottie-bg styles**

In `.vitepress/theme/custom.css`, update the `.VPHome .VPHero` block and add the new rules directly after it:

Replace:
```css
/* prettier-ignore */
.VPHome .VPHero {
  background-image:
    linear-gradient(90deg, var(--vp-c-bg-elv) 1px, #0000 1px),
    linear-gradient(var(--vp-c-bg-elv) 1px, #0000 1px);
  background-size: 16px 16px;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-border);
}
```

With:
```css
/* prettier-ignore */
.VPHome .VPHero {
  position: relative;
  overflow: hidden;
  background-image:
    linear-gradient(90deg, var(--vp-c-bg-elv) 1px, #0000 1px),
    linear-gradient(var(--vp-c-bg-elv) 1px, #0000 1px);
  background-size: 16px 16px;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-border);
}

.VPHome .VPHero .container {
  position: relative;
  z-index: 1;
}

.hero-lottie-bg {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  aspect-ratio: 1;
  pointer-events: none;
  z-index: 0;
  opacity: 0.12;
}

.hero-lottie-bg svg {
  height: 100%;
  width: auto;
  display: block;
}
```

- [ ] **Step 2: Run dev server and confirm no layout regressions**

```bash
pnpm dev
```

Open `http://localhost:5173` — hero should look identical (no Lottie yet, just confirming CSS doesn't break layout).

- [ ] **Step 3: Commit**

```bash
git add .vitepress/theme/custom.css
git commit -m "feat: add hero-lottie-bg CSS positioning"
```

---

### Task 4: Inject Lottie animation in Layout.vue

**Files:**
- Modify: `.vitepress/theme/Layout.vue`

- [ ] **Step 1: Add lottie-web import**

At the top of the `<script setup>` block, add after the existing imports:

```ts
import lottie, { type AnimationItem } from "lottie-web";
```

Full imports section becomes:
```ts
import DefaultTheme from "vitepress/theme";
import { computed, nextTick, onMounted, watch } from "vue";
import { useRoute } from "vitepress";
import { useData } from "vitepress";
import lottie, { type AnimationItem } from "lottie-web";
```

- [ ] **Step 2: Update onMounted to manage Lottie instance**

Replace the entire `onMounted` block:

```ts
onMounted(() => {
  let cleanup: (() => void) | null = null;
  let lottieInstance: AnimationItem | null = null;

  watch(
    () => route.path,
    () => {
      if (cleanup) cleanup();
      if (lottieInstance) {
        lottieInstance.destroy();
        lottieInstance = null;
      }
      nextTick(() => {
        const hero = document.querySelector<HTMLElement>(".VPHome .VPHero");
        if (hero) {
          let bg = hero.querySelector<HTMLElement>(".hero-lottie-bg");
          if (!bg) {
            bg = document.createElement("div");
            bg.className = "hero-lottie-bg";
            hero.insertBefore(bg, hero.firstChild);
          }
          lottieInstance = lottie.loadAnimation({
            container: bg,
            path: "/lottie-overview.json",
            renderer: "svg",
            loop: true,
            autoplay: true,
          });
        }
        const el = document.querySelector(".VPHome .VPHero .thinking");
        if (!el) return;
        cleanup = startTypewriter(el);
      });
    },
    { immediate: true },
  );
});
```

- [ ] **Step 3: Run dev server and verify animation appears**

```bash
pnpm dev
```

Open `http://localhost:5173` — the Lottie animation should be visible right-aligned in the hero, subtly layered over the grid pattern at low opacity. Navigate to another page and back to confirm the animation re-initialises and the old instance is cleaned up.

- [ ] **Step 4: Run linter**

```bash
pnpm lint
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add .vitepress/theme/Layout.vue
git commit -m "feat: inject lottie animation as hero background"
```
