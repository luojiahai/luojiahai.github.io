---
layout: home
title: luojiahai

hero:
  name: luojiahai
  text: 低级地球居民
  tagline: 你好，世界！
---

::: code-group

```typescript [whoami.ts] :line-numbers
export default {
  name: "luojiahai",
  selfProclaimedTitle: "低级地球居民",
  mbti: {
    code: "intj",
    identity: "assertive",
    name: "架构师",
  },
  email: "luo[at]jiahai.co".replace("[at]", "@"),
  website: "luojiahai.com/zh",
  languages: ["中文普通话", "中文广东话", "英文"],
  professional: ["软件工程", "站点可靠性工程"],
};
```

```typescript [resume.ts] :line-numbers
// 这是我的简历预览版。完整版本可按需提供。
// 请通过领英联系，并注明职位及薪资细节（仅限墨尔本或远程；谢绝中介）。

export default {
  education: [
    {
      institution: "墨尔本大学",
      degree: "理学硕士（计算机科学）",
      location: "澳大利亚墨尔本",
    },
    {
      institution: "墨尔本大学",
      degree: "理学学士",
      location: "澳大利亚墨尔本",
    },
    {
      institution: "北京大学",
      program: "暑期学校国际课程",
      location: "中国北京",
    },
  ],
  experience: [
    {
      company: "REA 集团（realestate.com.au）",
      position: "高级软件工程师",
      location: "澳大利亚墨尔本",
    },
    {
      company: "REA 集团（realestate.com.au）",
      position: "软件工程师",
      location: "澳大利亚墨尔本",
    },
    {
      company: "亚马逊云科技（AWS）",
      position: "软件开发工程师",
      location: "澳大利亚悉尼",
    },
    {
      company: "德勤",
      position: "软件开发顾问",
      location: "澳大利亚墨尔本",
    },
    {
      company: "墨尔本大学",
      position: "教学助理",
      location: "澳大利亚墨尔本",
    },
  ],
};
```

:::
