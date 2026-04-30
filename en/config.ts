import { defineConfig, type DefaultTheme } from "vitepress";
import { readdirSync, readFileSync, statSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const config = defineConfig({
  lang: "en-US",
  themeConfig: {
    nav: nav(),
    sidebar: sidebar(),
    editLink: {
      pattern: "https://github.com/luojiahai/luojiahai.github.io/edit/main/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      copyright: `© ${new Date().getFullYear()} LUOJIAHAI`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "Home", link: "/" },
    { text: "Blog", link: "/blog/", activeMatch: "/blog/" },
    {
      text: "Miscellaneous",
      activeMatch: "/miscellaneous/",
      items: [
        { text: "Use", link: "/miscellaneous/use" },
        { text: "Resume", link: "/miscellaneous/resume" },
        { text: "Portfolio", link: "/miscellaneous/portfolio" },
      ],
    },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    "/blog/": [{ text: "Blog", collapsed: false, items: blogSidebarItems() }],
    "/miscellaneous/": [
      {
        text: "Miscellaneous",
        collapsed: false,
        base: "/miscellaneous",
        items: [
          { text: "Use", link: "/use" },
          { text: "Resume", link: "/resume" },
          { text: "Portfolio", link: "/portfolio" },
        ],
      },
    ],
  };
}

function blogSidebarItems(): DefaultTheme.SidebarItem[] {
  const blogDir = resolve(__dirname, "blog");
  const items: DefaultTheme.SidebarItem[] = [];
  for (const f of readdirSync(blogDir).filter((f: string) => f !== "index.md" && !f.endsWith(".ts"))) {
    const fullPath = resolve(blogDir, f);
    if (statSync(fullPath).isDirectory()) {
      for (const c of readdirSync(fullPath)
        .filter((c: string) => c.endsWith(".md"))
        .sort()) {
        const src = readFileSync(resolve(fullPath, c), "utf-8");
        const title = src.match(/^#\s+(.+)/m)?.[1].trim() ?? c.replace(/\.md$/, "");
        items.push({ text: title, link: `/blog/${f}/${c.replace(/\.md$/, "")}` });
      }
    } else {
      const src = readFileSync(fullPath, "utf-8");
      const title = src.match(/^#\s+(.+)/m)?.[1].trim() ?? f.replace(/\.md$/, "");
      items.push({ text: title, link: `/blog/${f.replace(/\.md$/, "")}` });
    }
  }
  return items.sort((a, b) => (a.link ?? "").localeCompare(b.link ?? ""));
}
