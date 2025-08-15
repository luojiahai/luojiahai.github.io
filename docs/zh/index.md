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
import { WhoAmI } from "./types";

export default {
  name: "luojiahai",
  selfProclaimedTitle: "低级地球居民",
  personality: {
    code: "intj",
    type: "架构师",
  },
  email: "luo[at]jiahai.co".replace("[at]", "@"), // 电子邮箱已进行混淆以防垃圾邮件，请将 [at] 替换为 @
  website: "luojiahai.com/zh",
  languages: ["中文普通话", "中文广东话", "英文"],
  professions: ["软件工程", "站点可靠性工程"],
} satisfies WhoAmI;
```

```typescript [resume.ts] :line-numbers
// 这是我的简历预览版。完整版本可按需提供。
// 请通过领英联系，并注明职位及薪资细节（仅限墨尔本或远程；谢绝中介）。

import { Resume } from "./types";

export default {
  education: [
    {
      institution: "墨尔本大学",
      degree: ["理学硕士（计算机科学）", "理学学士"],
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
      title: ["高级软件工程师", "软件工程师"],
      location: "澳大利亚墨尔本",
    },
    {
      company: "亚马逊云科技（AWS）",
      title: "软件开发工程师",
      location: "澳大利亚悉尼",
    },
    {
      company: "德勤",
      title: "软件开发顾问",
      location: "澳大利亚墨尔本",
    },
    {
      company: "墨尔本大学",
      title: "教学助理",
      location: "澳大利亚墨尔本",
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
  selfProclaimedTitle: string;
  personality: Personality;
  email: string;
  website: string;
  languages: string[];
  professions: string[];
}

interface Education {
  institution: string;
  degree?: string | string[];
  program?: string | string[];
  location: string;
}

interface Experience {
  company: string;
  title: string | string[];
  location: string;
}

export interface Resume {
  education: Education[];
  experience: Experience[];
}
```

:::
