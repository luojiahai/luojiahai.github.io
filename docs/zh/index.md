---
layout: home
title: luojiahai

hero:
  name: luójiāhǎi
  text: 低级地球居民
  tagline: 👋 吃饭了吗？luojiahai 是我中文名字的拼音，我在网上就用它当昵称。
---

::: code-group

```typescript [whoami.ts] :line-numbers
// 我用 TypeScript 只是为了让你更容易看懂，不是因为我喜欢它。

import { WhoAmI } from "./types";

export default {
  name: "luojiahai",
  anglicization: "geoffrey",
  title: "低级地球居民",
  personality: {
    code: "intj",
    type: "架构师",
  },
  email: "luo[at]jiahai.co".replace("[at]", "@"), // 电子邮箱已进行混淆以防垃圾邮件，请将 [at] 替换为 @
  website: new URL("zh", "https://luojiahai.com/"),
  birthplace: "广州",
  languages: ["中文普通话", "中文广东话", "英文"],
} satisfies WhoAmI;
```

```typescript [resume.ts] :line-numbers
// 这是我的简历预览版，仅包含有限的信息。完整版本可按需提供。
// 请通过领英联系，并注明职位及薪资细节（仅限墨尔本或远程；谢绝中介）。

import { Resume } from "./types";

export default {
  education: [
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
      degree: "暑期学校国际课程",
      location: "中国北京",
      startDate: new Date(2016, 7),
      endDate: new Date(2016, 8),
    },
  ],
  experience: [
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
  ],
} satisfies Resume;
```

```typescript [types.ts] :line-numbers
interface Personality {
  code: string;
  type: string;
}

export interface WhoAmI {
  name: string;
  anglicization: string;
  title: string;
  personality: Personality;
  email: string;
  website: URL;
  birthplace: string;
  languages: string[];
}

interface Education {
  school: string;
  degree: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

interface Experience {
  company: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
}

export interface Resume {
  education: Education[];
  experience: Experience[];
}
```

:::
