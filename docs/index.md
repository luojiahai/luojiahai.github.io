---
layout: home
title: luojiahai

hero:
  name: luojiahai
  text: non-senior earth resident
  tagline: Hello, World!
---

::: code-group

```typescript [whoami.ts] :line-numbers
// I’m using TypeScript just to make it easier for you to read, not because I like it.

import { WhoAmI } from "./types";

export default {
  name: "luojiahai",
  title: "non-senior earth resident",
  personality: {
    code: "intj",
    type: "architect",
  },
  email: "luo[at]jiahai.co".replace("[at]", "@"), // email is obfuscated to prevent spam; replace [at] with @
  website: new URL("https://luojiahai.com/"),
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
      startDate: new Date(2018),
      endDate: new Date(2019),
    },
    {
      school: "The University of Melbourne",
      degree: "Bachelor of Science",
      location: "Parkville, Victoria, Australia",
      startDate: new Date(2015),
      endDate: new Date(2017),
    },
    {
      school: "Peking University",
      degree: "Summer School International Program",
      location: "Beijing, China",
      startDate: new Date(2016),
      endDate: new Date(2016),
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
      startDate: new Date(2018),
      endDate: new Date(2020),
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
  title: string;
  personality: Personality;
  email: string;
  website: URL;
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
