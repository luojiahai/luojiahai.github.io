import { defineConfig, type DefaultTheme } from "vitepress";

export const en = defineConfig({
  lang: "en-US",
  title: "luojiahai",
  description: "non-senior earth resident",

  themeConfig: {
    footer: {
      message:
        'Released under the <a href="https://github.com/luojiahai/luojiahai.github.io/blob/main/LICENSE" target="_blank">MIT License</a>.',
      copyright: `Copyright © 2015-${new Date().getFullYear()} luojiahai`,
    },
  },
});
