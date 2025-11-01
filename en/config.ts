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
      text: "edit this page on github",
    },
    footer: {
      message: "<a href='/'>[#] luojiahai</a>",
      copyright: `copyright © 2015-${new Date().getFullYear()} luojiahai`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "home", link: "/" },
    {
      text: "archives",
      link: "/archives/what-is-it",
      activeMatch: "/archives/",
    },
  ];
}

function sidebarArchives(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "archives",
      items: [{ text: "what is it?", link: "what-is-it" }],
    },
  ];
}
