import { defineConfig } from "vitepress";
import { search as zhSearch } from "./zh";

export const shared = defineConfig({
  rewrites: {
    "en/:rest*": ":rest*",
  },

  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,

  markdown: {
    theme: { light: "github-light-default", dark: "github-dark-default" },
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
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cascadia+Code:ital,wght@0,200..700;1,200..700&display=swap' }],
    ['link', { rel: 'stylesheet', href: 'https://use.typekit.net/htd7ieb.css' }],
    ['script', {}, `
      (function(d) {
        var config = {
          kitId: 'sdz6fkm',
          scriptTimeout: 3000,
          async: true
        },
        h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
      })(document);`
    ],
    ['meta', { name: 'theme-color', content: '#FF6699' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en' }],
    ['meta', { property: 'og:site_name', content: 'luojiahai' }],
    ['meta', { property: 'og:title', content: 'luojiahai' }],
    ['meta', { property: 'og:description', content: '' }],
    ['meta', { property: 'og:image', content: 'https://luojiahai.com/image.png' }],
    ['meta', { property: 'og:url', content: 'https://luojiahai.com/' }],
  ],

  themeConfig: {
    // logo: { src: "/apple-touch-icon.png" },

    socialLinks: [
      { icon: "x", link: "https://x.com/luojiahai" },
      { icon: "instagram", link: "https://instagram.com/luojiahai" },
      { icon: "linkedin", link: "https://linkedin.com/in/luojiahai" },
      { icon: "github", link: "https://github.com/luojiahai" },
    ],

    // search: {
    //   provider: "local",
    //   options: {
    //     locales: {
    //       ...zhSearch,
    //     },
    //   },
    // },
  },
});
