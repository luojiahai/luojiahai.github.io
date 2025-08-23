import { defineConfig, type DefaultTheme } from "vitepress";

export const config = defineConfig({
  lang: "en-US",
  title: "luojiahai",
  description: "hello, world!",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/documents/": { base: "/documents/", items: sidebarDocuments() },
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
      text: "Documents",
      link: "/documents/what-is-it",
      activeMatch: "/documents/",
    },
  ];
}

function sidebarDocuments(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "Documents",
      items: [
        { text: "What is it?", link: "what-is-it" },
        {
          text: "Examples",
          collapsed: false,
          items: [
            { text: "Runtime API Examples", link: "api-examples" },
            {
              text: "Markdown Extension Examples",
              link: "markdown-examples",
            },
          ],
        },
      ],
    },
  ];
}
