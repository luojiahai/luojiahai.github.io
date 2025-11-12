import { defineConfig, type DefaultTheme } from "vitepress";

export const config = defineConfig({
  lang: "zh-Hans",
  themeConfig: {
    nav: nav(),
    sidebar: {
      "/zh/archive/": { base: "/zh/archive", items: sidebarArchive() },
    },
    editLink: {
      pattern:
        "https://github.com/luojiahai/luojiahai.github.io/edit/main/:path",
      text: "在 github 上编辑此页面",
    },
    footer: {
      copyright: `版权所有 © 2015-${new Date().getFullYear()} luojiahai`,
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },
    outline: {
      label: "页面导航",
    },
    lastUpdated: {
      text: "最后更新于",
    },
    notFound: {
      title: "页面未找到",
      quote:
        "但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。",
      linkLabel: "前往首页",
      linkText: "带我回首页",
    },
    langMenuLabel: "多语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "菜单",
    darkModeSwitchLabel: "主题",
    lightModeSwitchTitle: "切换到浅色模式",
    darkModeSwitchTitle: "切换到深色模式",
    skipToContentLabel: "跳转到内容",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "首页", link: "/zh/" },
    {
      text: "档案",
      link: "/zh/archive/",
      activeMatch: "/zh/archive/",
    },
    {
      text: "派对鹦鹉",
      link: "/partyparrot",
      target: "_blank",
    },
  ];
}

function sidebarArchive(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "档案",
      items: [
        { text: "索引", link: "/" },
        { text: "简历", link: "/resume" },
        {
          text: "食谱",
          base: "/zh/archive/recipes",
          collapsed: true,
          items: [
            { text: "布朗尼", link: "/brownie" },
            { text: "生滚粥", link: "/cantonese-congee" },
            { text: "叉烧", link: "/char-siu" },
            { text: "干锅花菜", link: "/dry-pot-cauliflower" },
            { text: "番茄牛肉", link: "/tomato-beef" },
          ],
        },
      ],
    },
  ];
}

export function searchOptions(): DefaultTheme.LocalSearchOptions {
  return {
    translations: {
      button: {
        buttonText: "搜索",
        buttonAriaLabel: "搜索",
      },
      modal: {
        displayDetails: "显示详细列表",
        resetButtonTitle: "重置搜索",
        backButtonTitle: "关闭搜索",
        noResultsText: "没有结果",
        footer: {
          selectText: "选择",
          selectKeyAriaLabel: "输入",
          navigateText: "导航",
          navigateUpKeyAriaLabel: "上箭头",
          navigateDownKeyAriaLabel: "下箭头",
          closeText: "关闭",
          closeKeyAriaLabel: "esc",
        },
      },
    },
  };
}
