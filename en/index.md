---
layout: home
title: luojiahai

hero:
  name: luojiahai<span class="spinner"></span>
  text: hello, world!
  tagline: i like eating, cooking, and grocery shopping. in my downtime at home, i relax on the couch with a coke and some snacks, watching tv.
---

::: code-group

```typescript [whoami.ts] :line-numbers
export default {
  name: "luojiahai",
  personality: MyersBriggsTypeIndicator.INTJ,
  email: "luo[at]jiahai.co".replace("[at]", "@"),
  website: new URL("https://luojiahai.com"),
  hometown: "guangzhou, guangdong, china",
  location: "melbourne, victoria, australia",
  languages: ["mandarin Chinese", "cantonese Chinese", "english"],
};
```

```typescript [resume.ts] :line-numbers
// It is a preview of my resume with limited information. Full version available upon request.
// Please contact via LinkedIn with role and compensation details (Melbourne or remote only; no agency inquiries).

const experience = [
  {
    company: "rea group (realestate.com.au)",
    title: "senior software engineer",
    location: "richmond, victoria, australia",
    startDate: new Date(2025, 3),
    endDate: new Date(Date.now()),
  },
  {
    company: "rea group (realestate.com.au)",
    title: "software engineer",
    location: "richmond, victoria, australia",
    startDate: new Date(2024, 3),
    endDate: new Date(2025, 3),
  },
  {
    company: "amazon web services (aws)",
    title: "software development engineer",
    location: "sydney, new south wales, australia",
    startDate: new Date(2021, 10),
    endDate: new Date(2024, 3),
  },
  {
    company: "deloitte",
    title: "software development consultant",
    location: "melbourne, victoria, australia",
    startDate: new Date(2020, 3),
    endDate: new Date(2021, 10),
  },
  {
    company: "the university of melbourne",
    title: "teaching assistant",
    location: "parkville, victoria, australia",
    startDate: new Date(2018, 2),
    endDate: new Date(2019, 12),
  },
];

const education = [
  {
    school: "the university of melbourne",
    degree: "master of science (computer science)",
    location: "parkville, victoria, australia",
    startDate: new Date(2018, 2),
    endDate: new Date(2019, 12),
  },
  {
    school: "the university of melbourne",
    degree: "bachelor of science",
    location: "parkville, victoria, australia",
    startDate: new Date(2015, 3),
    endDate: new Date(2017, 12),
  },
  {
    school: "peking university",
    degree: "pkussi (peking university summer school international) program",
    location: "beijing, china",
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
