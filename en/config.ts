import { defineConfig, type DefaultTheme } from "vitepress";

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

function sidebar() {
  return [
    {
      text: "Posts",
      collapsed: false,
      base: "/posts",
      items: [
        { text: "Mastering Claude Code", link: "/mastering-claude-code" },
        { text: "Inside Claude Code", link: "/inside-claude-code" },
      ],
    },
    {
      text: "Life",
      collapsed: false,
      base: "/life",
      items: [{ text: "Use", link: "/use" }],
    },
    {
      text: "Work",
      collapsed: false,
      base: "/work",
      items: [
        { text: "Resume", link: "/resume" },
        { text: "Portfolio", link: "/portfolio" },
      ],
    },
  ];
}
