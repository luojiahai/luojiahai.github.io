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
    {
      text: "Life",
      items: [{ text: "Use", link: "/use" }],
    },
    {
      text: "Work",
      items: [
        { text: "Resume", link: "/resume" },
        { text: "Portfolio", link: "/portfolio" },
      ],
    },
  ];
}

function sidebar() {
  return [
    {
      text: "Life",
      items: [{ text: "Use", link: "/use" }],
    },
    {
      text: "Work",
      items: [
        { text: "Resume", link: "/resume" },
        { text: "Portfolio", link: "/portfolio" },
      ],
    },
  ];
}
