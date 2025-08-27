import { defineConfig, type DefaultTheme } from "vitepress";

export const config = defineConfig({
  lang: "en-US",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/archives/": { base: "/archives/", items: sidebarArchives() },
    },
    editLink: {
      pattern:
        "https://github.com/luojiahai/luojiahai.github.io/edit/main/:path",
      text: "Edit this page on GitHub",
    },
    footer: {
      message:
        'Released under the <a href="https://github.com/luojiahai/luojiahai.github.io/blob/main/LICENSE" target="_blank">MIT License</a>.',
      copyright: `Copyright © 2015-${new Date().getFullYear()} luojiahai`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "Home", link: "/" },
    {
      text: "Archives",
      link: "/archives/what-is-it",
      activeMatch: "/archives/",
    },
  ];
}

function sidebarArchives(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Archives",
      items: [{ text: "What is it?", link: "what-is-it" }],
    },
  ];
}
