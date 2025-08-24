---
layout: home
title: luojiahai

hero:
  name: luojiahai
  text: hello, world!
  tagline: |
    <code>m&#8203;a&#8203;i&#8203;n&#8203;(&#8203;v&#8203;,&#8203;c&#8203;)&#8203;c&#8203;h&#8203;a&#8203;r&#8203;*&#8203;*&#8203;c&#8203;;&#8203;{&#8203;f&#8203;o&#8203;r&#8203;(&#8203;v&#8203;[&#8203;c&#8203;+&#8203;+&#8203;]&#8203;=&#8203;s&#8203;t&#8203;r&#8203;d&#8203;u&#8203;p&#8203;(&#8203;"&#8203;h&#8203;e&#8203;l&#8203;l&#8203;o&#8203;,&#8203; &#8203;w&#8203;o&#8203;r&#8203;l&#8203;d&#8203;!&#8203;\&#8203;n&#8203;\&#8203;n&#8203;"&#8203;)&#8203;;&#8203;(&#8203;!&#8203;!&#8203;c&#8203;)[&#8203;*&#8203;c&#8203;]&#8203;&amp;&#8203;&amp;&#8203;(&#8203;v&#8203;--&#8203;|&#8203;|&#8203;--&#8203;c&#8203;&amp;&#8203;&amp;&#8203;e&#8203;x&#8203;e&#8203;c&#8203;l&#8203;p&#8203;(&#8203;*&#8203;c&#8203;,&#8203;*&#8203;c&#8203;,&#8203;c&#8203;[&#8203;!&#8203;!&#8203;c&#8203;]&#8203;+&#8203;!&#8203;!&#8203;c&#8203;,&#8203;!&#8203;c&#8203;)&#8203;)&#8203;;&#8203;*&#8203;*&#8203;c&#8203;=&#8203;!&#8203;c&#8203;)&#8203;w&#8203;r&#8203;i&#8203;t&#8203;e&#8203;(&#8203;!&#8203;!&#8203;*&#8203;c&#8203;,&#8203;*&#8203;c&#8203;,&#8203;!&#8203;!&#8203;*&#8203;*&#8203;c&#8203;)&#8203;;&#8203;}</code>
  actions:
    - theme: brand
      text: What is it?
      link: /documents/what-is-it
    - theme: alt
      text: Source
      link: https://github.com/luojiahai/luojiahai.github.io
---

<!-- <Badge type="info" text="non-senior earth resident" /> -->

::: code-group

```typescript [whoami.ts] :line-numbers
import { WhoAmI } from "./types";

export default {
  handle: "luojiahai",
  anglicization: "geoffrey",
  personality: {
    code: "intj",
    type: "architect",
  },
  email: "luo[at]jiahai.co".replace("[at]", "@"),
  website: new URL("https://luojiahai.com"),
  birthplace: "guangzhou",
  languages: ["mandarin chinese", "cantonese chinese", "english"],
} satisfies WhoAmI;
```

```typescript [resume.ts] :line-numbers
// It is a preview of my resume with limited information. Full version available upon request.
// Please contact via LinkedIn with role and compensation details (Melbourne or remote only; no agency inquiries).

import { Resume } from "./types";

export default {
  education: [
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
  ],
  experience: [
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
  ],
} satisfies Resume;
```

```typescript [types.ts] :line-numbers
interface Personality {
  code: string;
  type: string;
}

export interface WhoAmI {
  handle: string;
  anglicization: string;
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
