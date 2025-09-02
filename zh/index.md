---
layout: home
title: luojiahai

hero:
  name: luojiahai
  text: hello, world!
  tagline: |
    <code>#&#8203;i&#8203;n&#8203;c&#8203;l&#8203;u&#8203;d&#8203;e&#8203;&lt;&#8203;i&#8203;o&#8203;s&#8203;t&#8203;r&#8203;e&#8203;a&#8203;m&#8203;&gt;
    i&#8203;n&#8203;t&#8203; &#8203;m&#8203;a&#8203;i&#8203;n&#8203;()&#8203;{&#8203;[&#8203;]&#8203;()&#8203;{&#8203;s&#8203;t&#8203;a&#8203;t&#8203;i&#8203;c&#8203; &#8203;c&#8203;h&#8203;a&#8203;r&#8203; &#8203;s&#8203;[&#8203;]&#8203;=&#8203;"&#8203;i&#8203;f&#8203;m&#8203;m&#8203;p&#8203;-&#8203;!&#8203;x&#8203;p&#8203;s&#8203;m&#8203;e&#8203;\"&#8203;\&#8203;x&#8203;0&#8203;b&#8203;"&#8203;;&#8203;f&#8203;o&#8203;r&#8203;(&#8203;c&#8203;h&#8203;a&#8203;r&#8203;*&#8203;p&#8203;=&#8203;s&#8203;;&#8203;*&#8203;p&#8203;;&#8203;)&#8203;s&#8203;t&#8203;d&#8203;:&#8203;:&#8203;c&#8203;o&#8203;u&#8203;t&#8203;&lt;&#8203;&lt;&#8203;(&#8203;c&#8203;h&#8203;a&#8203;r&#8203;)(&#8203;*&#8203;p&#8203;+&#8203;+&#8203;-&#8203;1&#8203;)&#8203;;&#8203;}&#8203;()&#8203;;&#8203;}</code>
  actions:
    - theme: brand
      text: 这是什么？
      link: /zh/archives/what-is-it
    - theme: alt
      text: 源代码
      link: https://github.com/luojiahai/luojiahai.github.io
---

::: code-group

```typescript [whoami.ts] :line-numbers
export default {
  name: {
    full: "罗嘉海",
    anglicized: "Geoffrey",
  },
  personality: MyersBriggs.INTJ,
  email: "luo[at]jiahai.co".replace("[at]", "@"),
  website: new URL("zh", "https://luojiahai.com"),
  hometown: "中国广州",
  location: "澳大利亚墨尔本",
  languages: ["中文普通话", "中文广东话", "英文"],
};
```

```typescript [resume.ts] :line-numbers
// 这是我的简历预览版，仅包含有限的信息。完整版本可按需提供。
// 请通过领英联系，并注明职位及薪资细节（仅限墨尔本或远程；谢绝中介）。

const education = [
  {
    school: "墨尔本大学",
    degree: "理学硕士（计算机科学）",
    location: "澳大利亚墨尔本",
    startDate: new Date(2018, 2),
    endDate: new Date(2019, 12),
  },
  {
    school: "墨尔本大学",
    degree: "理学学士",
    location: "澳大利亚墨尔本",
    startDate: new Date(2015, 3),
    endDate: new Date(2017, 12),
  },
  {
    school: "北京大学",
    degree: "北京大学暑期学校国际课程",
    location: "中国北京",
    startDate: new Date(2016, 7),
    endDate: new Date(2016, 8),
  },
];

const experience = [
  {
    company: "REA 集团（realestate.com.au）",
    title: "高级软件工程师",
    location: "澳大利亚墨尔本",
    startDate: new Date(2025, 3),
    endDate: new Date(Date.now()),
  },
  {
    company: "REA 集团（realestate.com.au）",
    title: "软件工程师",
    location: "澳大利亚墨尔本",
    startDate: new Date(2024, 3),
    endDate: new Date(2025, 3),
  },
  {
    company: "亚马逊云科技（AWS）",
    title: "软件开发工程师",
    location: "澳大利亚悉尼",
    startDate: new Date(2021, 10),
    endDate: new Date(2024, 3),
  },
  {
    company: "德勤",
    title: "软件开发顾问",
    location: "澳大利亚墨尔本",
    startDate: new Date(2020, 3),
    endDate: new Date(2021, 10),
  },
  {
    company: "墨尔本大学",
    title: "教学助理",
    location: "澳大利亚墨尔本",
    startDate: new Date(2018, 2),
    endDate: new Date(2019, 12),
  },
];

export default {
  education,
  experience,
};
```

:::
