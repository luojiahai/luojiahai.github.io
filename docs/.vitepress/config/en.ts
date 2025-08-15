import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  title: "luojiahai",
  description: "non-senior earth resident",

  themeConfig: {
    nav: nav(),

    footer: {
      copyright: `Copyright © 2019-${new Date().getFullYear()} luojiahai`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "Home", link: "/" },
    { text: "Resume", link: "/resume" },
  ];
}
