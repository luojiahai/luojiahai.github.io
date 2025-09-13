import { defineConfig } from "vitepress";
import { config as enConfig } from "../en/config";
import { config as zhConfig, search as zhSearch } from "../zh/config";

export default defineConfig({
  title: "luojiahai",
  description: "hello, world!",
  locales: {
    root: { label: "English", ...enConfig },
    zh: { label: "简体中文", ...zhConfig },
  },
  srcExclude: ["examples/**/*", "README.md"],
  appearance: false,
  lastUpdated: true,
  markdown: {
    theme: { light: "github-light-default", dark: "github-dark-default" },
  },
  metaChunk: true,
  cleanUrls: true,
  rewrites: {
    "en/:rest*": ":rest*",
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
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cascadia+Mono:ital,wght@0,200..700;1,200..700&family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://api.fontshare.com/v2/css?f[]=satoshi@500,700&display=swap'}],
    ['meta', { name: 'theme-color', content: '#000' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'luojiahai' }],
    ['meta', { property: 'og:title', content: 'luojiahai' }],
    ['meta', { property: 'og:description', content: '' }],
    ['meta', { property: 'og:image', content: 'https://luojiahai.com/image.png' }],
    ['meta', { property: 'og:url', content: 'https://luojiahai.com/' }],
  ],
  themeConfig: {
    logo: {
      light: "/apple-touch-icon.png",
      dark: "/apple-touch-icon-dark.png",
    },
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
          ...zhSearch,
        },
      },
    },
  },
});
