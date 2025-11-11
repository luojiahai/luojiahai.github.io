import { defineConfig } from "vitepress";
import { config as enConfig } from "../en/config";
import { config as zhConfig } from "../zh/config";
import { searchOptions as enSearchOptions } from "../en/config";
import { searchOptions as zhSearchOptions } from "../zh/config";

export default defineConfig({
  title: "luojiahai",
  description: "hello, world!",
  locales: {
    root: { label: "english", ...enConfig },
    zh: { label: "简体中文", ...zhConfig },
  },
  srcExclude: ["examples/**/*", "README.md"],
  appearance: true,
  lastUpdated: true,
  markdown: {
    theme: { light: "github-light-default", dark: "github-dark-default" },
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
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#00aeec' }],
    ['meta', { name: 'description', content: 'hello, world!' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'luojiahai' }],
    ['meta', { property: 'og:title', content: 'luojiahai' }],
    ['meta', { property: 'og:description', content: '' }],
    ['meta', { property: 'og:image', content: 'https://luojiahai.com/image.png' }],
    ['meta', { property: 'og:url', content: 'https://luojiahai.com/' }],
  ],
  themeConfig: {
    socialLinks: [
      { icon: "x", link: "https://x.com/luojiahai" },
      { icon: "instagram", link: "https://instagram.com/luojiahai" },
      { icon: "linkedin", link: "https://linkedin.com/in/luojiahai" },
      { icon: "github", link: "https://github.com/luojiahai" },
    ],
    search: {
      provider: "local",
      options: {
        locales: {
          root: enSearchOptions(),
          zh: zhSearchOptions(),
        },
      },
    },
  },
});
