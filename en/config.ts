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
    { text: "Resume", link: "/resume" },
    { text: "Use", link: "/use" },
  ];
}

function sidebar() {
  return [
    {
      items: [
        { text: 'Resume', link: '/resume' },
        { text: 'Use', link: '/use' },
      ]
    }
  ];
}
