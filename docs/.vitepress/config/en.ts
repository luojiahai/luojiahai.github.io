import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  title: "luojiahai",
  description: "non-senior earth resident",

  themeConfig: {
    footer: {
      copyright: `Copyright © 2015-${new Date().getFullYear()} luojiahai`,
    },
  },
});
