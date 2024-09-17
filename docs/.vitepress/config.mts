import { defineConfig } from 'vitepress'
import { search, nav, sidebar, socialLinks, locales, head, title, logo } from './options.mts'

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
  },
  locales: locales,
  head: head,
})
