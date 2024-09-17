import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'luojiahai',
  description: '',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/apple-touch-icon.png',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
    ],
    sidebar: [],
    socialLinks: [
      { icon: 'x', link: 'https://x.com/luojiahai' },
      { icon: 'instagram', link: 'https://instagram.com/luojiahai' },
      { icon: 'github', link: 'https://github.com/luojiahai' },
    ],
  },
  locales: {
    root: {
      label: 'English',
      lang: 'en',
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
    }
  },
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
})
