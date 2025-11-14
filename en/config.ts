import { defineConfig, type DefaultTheme } from "vitepress";

export const config = defineConfig({
  lang: "en-US",
  themeConfig: {
    nav: nav(),
    editLink: {
      pattern:
        "https://github.com/luojiahai/luojiahai.github.io/edit/main/:path",
      text: "edit this page on github",
    },
    footer: {
      copyright: `copyright © 2015-${new Date().getFullYear()} luojiahai`,
    },
    docFooter: {
      prev: "previous",
      next: "next",
    },
    outline: {
      label: "on this page",
    },
    lastUpdated: {
      text: "last updated",
    },
    notFound: {
      title: "page not found",
      quote:
        "but if you don't change your direction, and if you keep looking, you may end up where you are heading.",
      linkLabel: "go to home",
      linkText: "take me home",
    },
    langMenuLabel: "change language",
    returnToTopLabel: "return to top",
    sidebarMenuLabel: "menu",
    darkModeSwitchLabel: "appearance",
    lightModeSwitchTitle: "switch to light theme",
    darkModeSwitchTitle: "switch to dark theme",
    skipToContentLabel: "skip to content",
  },
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: "home", link: "/" },
    {
      text: "resume",
      link: "/resume",
    },
    {
      text: "use",
      link: "/use",
    },
  ];
}

export function searchOptions(): DefaultTheme.LocalSearchOptions {
  return {
    translations: {
      button: {
        buttonText: "search",
        buttonAriaLabel: "search",
      },
      modal: {
        displayDetails: "display detailed list",
        resetButtonTitle: "reset search",
        backButtonTitle: "close search",
        noResultsText: "no results for",
        footer: {
          selectText: "to select",
          selectKeyAriaLabel: "enter",
          navigateText: "to navigate",
          navigateUpKeyAriaLabel: "up arrow",
          navigateDownKeyAriaLabel: "down arrow",
          closeText: "to close",
          closeKeyAriaLabel: "escape",
        },
      },
    },
  };
}
