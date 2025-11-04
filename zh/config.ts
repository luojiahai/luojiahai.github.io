import { defineConfig, type DefaultTheme } from "vitepress";

export const config = defineConfig({
  lang: "zh-Hans",
  themeConfig: {
    nav: nav(),
    search: { options: searchOptions() },
    sidebar: {
      "/zh/archive/": { base: "/zh/archive/", items: sidebarArchive() },
    },
    editLink: {
      pattern:
        "https://github.com/luojiahai/luojiahai.github.io/edit/main/:path",
      text: "在 github 上编辑此页面",
    },
    footer: {
      message: "<a href='/'>luojiahai</a>",
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
      link: "/zh/archive/what-is-it",
      activeMatch: "/zh/archive/",
    },
  ];
}

function sidebarArchive(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: "档案",
      items: [
        { text: "这是什么？", link: "what-is-it" },
        { text: "简历", link: "resume" },
        {
          text: "食谱",
          base: "/zh/archive/recipes/",
          collapsed: true,
          items: [
            { text: "布朗尼", link: "brownie" },
            { text: "生滚粥", link: "cantonese-congee" },
            { text: "叉烧", link: "char-siu" },
            { text: "干锅花菜", link: "dry-pot-cauliflower" },
          ],
        },
      ],
    },
  ];
}

function searchOptions(): Partial<DefaultTheme.AlgoliaSearchOptions> {
  return {
    placeholder: "搜索文档",
    translations: {
      button: {
        buttonText: "搜索文档",
        buttonAriaLabel: "搜索文档",
      },
      modal: {
        searchBox: {
          // clearButtonTitle: "清除查询条件",
          // clearButtonAriaLabel: "清除查询条件",
          // closeButtonText: "关闭",
          // closeButtonAriaLabel: "关闭",
          // placeholderText: "搜索文档",
          // placeholderTextAskAi: "向 AI 提问：",
          // placeholderTextAskAiStreaming: "回答中...",
          // searchInputLabel: "搜索",
          // backToKeywordSearchButtonText: "返回关键字搜索",
          // backToKeywordSearchButtonAriaLabel: "返回关键字搜索",
        },
        startScreen: {
          recentSearchesTitle: "搜索历史",
          noRecentSearchesText: "没有搜索历史",
          saveRecentSearchButtonTitle: "保存至搜索历史",
          removeRecentSearchButtonTitle: "从搜索历史中移除",
          favoriteSearchesTitle: "收藏",
          removeFavoriteSearchButtonTitle: "从收藏中移除",
          // recentConversationsTitle: "最近的对话",
          // removeRecentConversationButtonTitle: "从历史记录中删除对话",
        },
        errorScreen: {
          titleText: "无法获取结果",
          helpText: "你可能需要检查你的网络连接",
        },
        noResultsScreen: {
          noResultsText: "无法找到相关结果",
          suggestedQueryText: "你可以尝试查询",
          reportMissingResultsText: "你认为该查询应该有结果？",
          reportMissingResultsLinkText: "点击反馈",
        },
        // resultsScreen: {
        //   askAiPlaceholder: "向 AI 提问： ",
        // },
        // askAiScreen: {
        //   disclaimerText: "答案由 AI 生成，可能不准确，请自行验证。",
        //   relatedSourcesText: "相关来源",
        //   thinkingText: "思考中...",
        //   copyButtonText: "复制",
        //   copyButtonCopiedText: "已复制！",
        //   copyButtonTitle: "复制",
        //   likeButtonTitle: "赞",
        //   dislikeButtonTitle: "踩",
        //   thanksForFeedbackText: "感谢你的反馈！",
        //   preToolCallText: "搜索中...",
        //   duringToolCallText: "搜索 ",
        //   afterToolCallText: "已搜索",
        //   aggregatedToolCallText: "已搜索",
        // },
        footer: {
          selectText: "选择",
          // submitQuestionText: "提交问题",
          selectKeyAriaLabel: "enter 键",
          navigateText: "切换",
          navigateUpKeyAriaLabel: "向上箭头",
          navigateDownKeyAriaLabel: "向下箭头",
          closeText: "关闭",
          // backToSearchText: "返回搜索",
          closeKeyAriaLabel: "esc 键",
          // poweredByText: "搜索提供者",
        },
      },
    },
  };
}
