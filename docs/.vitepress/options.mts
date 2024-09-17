import { DefaultTheme, HeadConfig, LocaleConfig } from 'vitepress'

export const title: string = 'luojiahai';

export const logo: string = '/apple-touch-icon.png';

export const search : { provider: 'local', options?: DefaultTheme.LocalSearchOptions } = {
  provider: 'local',
  options: {
    locales: {
      root: {
        translations: {
          button: {
            buttonText: 'search',
            buttonAriaLabel: 'search'
          }
        }
      },
      zh: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索'
          },
          modal: {
            displayDetails: '显示详细列表',
            resetButtonTitle: '重置搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '输入',
              navigateText: '导航',
              navigateUpKeyAriaLabel: '上箭头',
              navigateDownKeyAriaLabel: '下箭头',
              closeText: '关闭',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      }
    }
  },
};

export const nav: DefaultTheme.NavItem[] = [
  { text: 'whoami', link: '/' },
  { text: 'examples', link: '/examples' },
];

export const sidebar: DefaultTheme.Sidebar = [
  {
    text: 'Examples',
    items: [
      { text: 'Runtime API Examples', link: '/examples/api-examples' },
      { text: 'Markdown Extension Examples', link: '/examples/markdown-examples' },
    ]
  }
];

export const socialLinks: DefaultTheme.SocialLink[] = [
  { icon: 'x', link: 'https://x.com/luojiahai' },
  { icon: 'instagram', link: 'https://instagram.com/luojiahai' },
  { icon: 'github', link: 'https://github.com/luojiahai' },
];

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
];
