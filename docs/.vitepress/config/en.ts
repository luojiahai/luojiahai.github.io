import { defineConfig, type DefaultTheme } from 'vitepress'

export const en = defineConfig({
  lang: 'en-US',
  title: 'luojiahai',
  description: 'this is a useless site.',

  themeConfig: {
    nav: nav(),

    footer: {
      copyright: `copyright © 2019-${new Date().getFullYear()} luojiahai`,
    },
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'home', link: '/' },
    { text: 'about', link: '/about' },
    { text: 'resume', link: '/cv' },
  ];
}
