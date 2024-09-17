import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'luojiahai',
  description: '',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/static/apple-touch-icon.png',

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
  }
})
