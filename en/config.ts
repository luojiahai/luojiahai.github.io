import { defineConfig, type DefaultTheme } from "vitepress";

export const config = defineConfig({
  lang: "en-US",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/archive/": { base: "/archive/", items: sidebarArchive() },
    },
    editLink: {
      pattern:
        "https://github.com/luojiahai/luojiahai.github.io/edit/main/:path",
      text: "edit this page on github",
    },
    footer: {
      message: "<a href='/'>luojiahai</a>",
      copyright: `copyright © 2015-${new Date().getFullYear()} luojiahai`,
    },
    docFooter: {
      prev: "previous",
      next: "next",
    },
    outline: {
      label: "on this page",
    },
    lastUpdated: {
      text: "last updated",
    },
    notFound: {
      title: "page not found",
      quote:
        "but if you don't change your direction, and if you keep looking, you may end up where you are heading.",
      linkLabel: "go to home",
      linkText: "take me home",
    },
    langMenuLabel: "change language",
    returnToTopLabel: "return to top",
    sidebarMenuLabel: "menu",
    darkModeSwitchLabel: "appearance",
    lightModeSwitchTitle: "switch to light theme",
    darkModeSwitchTitle: "switch to dark theme",
    skipToContentLabel: "skip to content",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "home", link: "/" },
    {
      text: "archive",
      link: "/archive/what-is-it",
      activeMatch: "/archive/",
    },
  ];
}

function sidebarArchive(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "archive",
      items: [
        { text: "what is it?", link: "what-is-it" },
        { text: "resume", link: "resume" },
        {
          text: "recipes",
          base: "/archive/recipes/",
          collapsed: true,
          items: [
            { text: "brownie", link: "brownie" },
            { text: "cantonese congee", link: "cantonese-congee" },
            { text: "char siu (cantonese bbq pork)", link: "char-siu" },
            { text: "dry pot cauliflower", link: "dry-pot-cauliflower" },
          ],
        },
      ],
    },
  ];
}
