import { defineConfig } from "vitepress";
import { config as enConfig } from "../en/config";
import { config as zhConfig } from "../zh/config";
import { searchOptions as zhSearchOptions } from "../zh/config";

export default defineConfig({
  title: "luojiahai",
  description: "Hello, World!",
  locales: {
    root: { label: "English", ...enConfig },
    zh: { label: "简体中文", ...zhConfig },
  },
  srcExclude: ["archive/**/*", "examples/**/*", "README.md"],
  appearance: true,
  lastUpdated: true,
  markdown: {
    theme: { light: "vitesse-light", dark: "vitesse-dark" },
  },
  metaChunk: true,
  cleanUrls: true,
  rewrites: {
    "en/:rest*": ":rest*",
    "root/:rest*": ":rest*",
  },
  sitemap: {
    hostname: "https://luojiahai.com",
    transformItems(items) {
      return items.filter((item) => !item.url.includes("migration"));
    },
  },
  /* prettier-ignore */
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+Symbols+2&display=swap' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png', sizes: '32x32' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png', sizes: '16x16' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/android-chrome-192x192.png', sizes: '192x192' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/android-chrome-512x512.png', sizes: '512x512' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#d97757' }],
    ['meta', { name: 'description', content: 'Hello, World!' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'luojiahai' }],
    ['meta', { property: 'og:title', content: 'luojiahai' }],
    ['meta', { property: 'og:description', content: '' }],
    ['meta', { property: 'og:image', content: 'https://luojiahai.com/image.png' }],
    ['meta', { property: 'og:url', content: 'https://luojiahai.com/' }],
  ],
  themeConfig: {
    logo: "/logo.svg",
    socialLinks: [
      { icon: "github", link: "https://github.com/luojiahai" },
      { icon: "x", link: "https://x.com/luojiahai" },
      { icon: "instagram", link: "https://instagram.com/luojiahai" },
      { icon: "linkedin", link: "https://linkedin.com/in/luojiahai" },
      { icon: "bilibili", link: "https://space.bilibili.com/866961" },
      { icon: "sinaweibo", link: "https://weibo.com/ljiahai" },
    ],
    search: {
      provider: "local",
      options: {
        locales: {
          zh: zhSearchOptions(),
        },
      },
    },
  },
});
