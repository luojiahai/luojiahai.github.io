import { defineConfig } from 'vitepress'
import { search, nav, sidebar, socialLinks, locales, head, title, logo, footer } from './options.mts'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: title,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: logo,
    search: search,
    nav: nav,
    sidebar: sidebar,
    socialLinks: socialLinks,
    footer: footer,
  },
  locales: locales,
  head: head,
})
