---
layout: home
title: luojiahai

hero:
  name: luojiahai<span class="spinner"></span>
  text: hello, world!
  tagline: I like eating, cooking, and grocery shopping. Eating snacks after each meal is a must.
  actions:
    - theme: brand
      text: What is it?
      link: /archives/what-is-it
    - theme: alt
      text: Source
      link: https://github.com/luojiahai/luojiahai.github.io
---

::: code-group

```typescript [whoami.ts] :line-numbers
export default {
  name: {
    full: "Luo Jiahai",
    anglicized: "Geoffrey",
  },
  personality: MyersBriggs.INTJ,
  email: "luo[at]jiahai.co".replace("[at]", "@"),
  website: new URL("https://luojiahai.com"),
  hometown: "Guangzhou, Guangdong, China",
  location: "Melbourne, Victoria, Australia",
  languages: ["Mandarin Chinese", "Cantonese Chinese", "English"],
};
```

```typescript [resume.ts] :line-numbers
// It is a preview of my resume with limited information. Full version available upon request.
// Please contact via LinkedIn with role and compensation details (Melbourne or remote only; no agency inquiries).

const education = [
  {
    school: "The University of Melbourne",
    degree: "Master of Science (Computer Science)",
    location: "Parkville, Victoria, Australia",
    startDate: new Date(2018, 2),
    endDate: new Date(2019, 12),
  },
  {
    school: "The University of Melbourne",
    degree: "Bachelor of Science",
    location: "Parkville, Victoria, Australia",
    startDate: new Date(2015, 3),
    endDate: new Date(2017, 12),
  },
  {
    school: "Peking University",
    degree: "PKUSSI (Peking University Summer School International) Program",
    location: "Beijing, China",
    startDate: new Date(2016, 7),
    endDate: new Date(2016, 8),
  },
];

const experience = [
  {
    company: "REA Group (realestate.com.au)",
    title: "Senior Software Engineer",
    location: "Richmond, Victoria, Australia",
    startDate: new Date(2025, 3),
    endDate: new Date(Date.now()),
  },
  {
    company: "REA Group (realestate.com.au)",
    title: "Software Engineer",
    location: "Richmond, Victoria, Australia",
    startDate: new Date(2024, 3),
    endDate: new Date(2025, 3),
  },
  {
    company: "Amazon Web Services (AWS)",
    title: "Software Development Engineer",
    location: "Sydney, New South Wales, Australia",
    startDate: new Date(2021, 10),
    endDate: new Date(2024, 3),
  },
  {
    company: "Deloitte",
    title: "Software Development Consultant",
    location: "Melbourne, Victoria, Australia",
    startDate: new Date(2020, 3),
    endDate: new Date(2021, 10),
  },
  {
    company: "The University of Melbourne",
    title: "Teaching Assistant",
    location: "Parkville, Victoria, Australia",
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
