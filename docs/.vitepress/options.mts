import { DefaultTheme, HeadConfig, LocaleConfig } from 'vitepress'

export const title: string = 'luojiahai';

export const logo: string = '/apple-touch-icon.png';

export const search : { provider: 'local', options?: DefaultTheme.LocalSearchOptions } = {
  provider: 'local',
};

export const nav: DefaultTheme.NavItem[] = [
  { text: 'whoami', link: '/' },
];

export const sidebar: DefaultTheme.Sidebar = [];

export const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'x', link: 'https://x.com/luojiahai' },
  { icon: 'instagram', link: 'https://instagram.com/luojiahai' },
  { icon: 'linkedin', link: 'https://linkedin.com/in/luojiahai' },
  { icon: 'github', link: 'https://github.com/luojiahai' },
];

export const footer: DefaultTheme.Footer = {
  copyright: 'Copyright © 2019-present luojiahai',
};

export const locales: LocaleConfig<DefaultTheme.Config> = {
  root: {
    label: 'english',
    lang: 'en',
  },
  zh: {
    label: '简体中文',
    lang: 'zh',
  }
};

export const head: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }],
  ['link', { rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' }],
  ['link', { rel: 'icon', type: 'image/png', href: '/favicon-16x16.png' }],
  ['link', { rel: 'manifest', href: '/site.webmanifest' }],
];
