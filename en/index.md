---
layout: home
title: luojiahai

hero:
  name: luojiahai
  text: hello, world!
  tagline: |
    <code>#&#8203;i&#8203;n&#8203;c&#8203;l&#8203;u&#8203;d&#8203;e&#8203;&lt;&#8203;i&#8203;o&#8203;s&#8203;t&#8203;r&#8203;e&#8203;a&#8203;m&#8203;&gt;&#8203;
    i&#8203;n&#8203;t&#8203; &#8203;m&#8203;a&#8203;i&#8203;n&#8203;(&#8203;)&#8203;{&#8203;s&#8203;t&#8203;a&#8203;t&#8203;i&#8203;c&#8203; &#8203;c&#8203;h&#8203;a&#8203;r&#8203; &#8203;s&#8203;[&#8203;]&#8203;=&#8203;{&#8203;1&#8203;0&#8203;4&#8203;,&#8203;1&#8203;0&#8203;1&#8203;,&#8203;1&#8203;0&#8203;8&#8203;,&#8203;1&#8203;0&#8203;8&#8203;,&#8203;1&#8203;1&#8203;1&#8203;,&#8203;4&#8203;4&#8203;,&#8203;3&#8203;2&#8203;,&#8203;1&#8203;1&#8203;9&#8203;,&#8203;1&#8203;1&#8203;1&#8203;,&#8203;1&#8203;1&#8203;4&#8203;,&#8203;1&#8203;0&#8203;8&#8203;,&#8203;1&#8203;0&#8203;0&#8203;,&#8203;3&#8203;3&#8203;,&#8203;1&#8203;0&#8203;,&#8203;0&#8203;};&#8203;f&#8203;o&#8203;r&#8203;(&#8203;c&#8203;h&#8203;a&#8203;r&#8203;*&#8203;p&#8203;=&#8203;s&#8203;;&#8203;*&#8203;p&#8203;;&#8203;)&#8203;s&#8203;t&#8203;d&#8203;:&#8203;:&#8203;c&#8203;o&#8203;u&#8203;t&#8203;&lt;&#8203;&lt;&#8203;*&#8203;p&#8203;+&#8203;+&#8203;;&#8203;}
    </code>
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
  hometown: "Guangzhou, China",
  location: "Melbourne, Australia",
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
