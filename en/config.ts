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
    { text: "Posts", link: "/posts/", activeMatch: "/posts/" },
    {
      text: "Life",
      activeMatch: "/life/",
      items: [{ text: "Use", link: "/life/use" }],
    },
    {
      text: "Work",
      activeMatch: "/work/",
      items: [
        { text: "Resume", link: "/work/resume" },
        { text: "Portfolio", link: "/work/portfolio" },
      ],
    },
  ];
}

function sidebar(): DefaultTheme.Sidebar {
  return {
    "/posts/": [{ text: "Posts", collapsed: false, items: postsSidebarItems() }],
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
    .filter((f: string) => f !== "index.md" && !f.endsWith(".ts"))
    .map((f: string) => {
      const fullPath = resolve(postsDir, f);
      if (statSync(fullPath).isDirectory()) {
        const children = readdirSync(fullPath)
          .filter((c: string) => c.endsWith(".md"))
          .sort()
          .map((c: string) => {
            const src = readFileSync(resolve(fullPath, c), "utf-8");
            const title = src.match(/^#\s+(.+)/m)?.[1].trim() ?? c.replace(/\.md$/, "");
            const slug = c.replace(/\.md$/, "");
            return { text: title, link: `/posts/${f}/${slug}` };
          });
        const dirTitle = f.replace(/-/g, " ").replace(/\b\w/g, (ch) => ch.toUpperCase());
        return { text: dirTitle, collapsed: true, items: children };
      }
      const src = readFileSync(fullPath, "utf-8");
      const title = src.match(/^#\s+(.+)/m)?.[1].trim() ?? f.replace(/\.md$/, "");
      const slug = f.replace(/\.md$/, "");
      return { text: title, link: `/posts/${slug}` };
    })
    .sort((a: DefaultTheme.SidebarItem, b: DefaultTheme.SidebarItem) =>
      (a.text ?? "").localeCompare(b.text ?? ""),
    );
}
