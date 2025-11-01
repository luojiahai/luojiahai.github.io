---
layout: home
title: luojiahai

hero:
  name: luojiahai<span class="spinner"></span>
  text: 你好，世界！
  tagline: 我喜欢吃饭、做饭、逛超市；躺在沙发上看电视，配上可乐和零食。我是麦当劳和肯德基的信徒。
---

<Badge type="pink" label="🖥️" text="普通技工（计算机）" />

::: code-group

```typescript [whoami.ts] :line-numbers
export default {
  name: "luojiahai",
  personality: MyersBriggsTypeIndicator.INTJ,
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

export default {
  experience,
  education,
};
```

:::
