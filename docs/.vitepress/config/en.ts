import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  title: 'luojiahai',
  description: 'This is a useless site.',

  themeConfig: {
    nav: nav(),

    footer: {
      copyright: `Copyright © 2019-${new Date().getFullYear()} luojiahai`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Home', link: '/' },
    { text: 'About', link: '/about' },
    { text: 'CV', link: '/cv' },
  ];
}
