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
import { WhoAmI } from "./types";

export default {
  name: "luojiahai",
  selfProclaimedTitle: "non-senior earth resident",
  personality: {
    code: "intj",
    type: "architect",
  },
  email: "luo[at]jiahai.co".replace("[at]", "@"), // email is obfuscated to prevent spam; replace [at] with @
  website: "luojiahai.com",
  languages: ["mandarin chinese", "cantonese chinese", "english"],
  professions: ["software engineering", "site reliability engineering"],
} satisfies WhoAmI;
```

```typescript [resume.ts] :line-numbers
// It is a preview of my resume. Full version available upon request.
// Please contact via LinkedIn with role and compensation details (Melbourne or remote only; no agency inquiries).

import { Resume } from "./types";

export default {
  education: [
    {
      school: "The University of Melbourne",
      degree: "Master of Science (Computer Science)",
      location: "Parkville, Victoria, Australia",
    },
    {
      school: "The University of Melbourne",
      degree: "Bachelor of Science",
      location: "Parkville, Victoria, Australia",
    },
    {
      school: "Peking University",
      degree: "Summer School International Program",
      location: "Beijing, China",
    },
  ],
  experience: [
    {
      company: "REA Group (realestate.com.au)",
      title: "Senior Software Engineer",
      location: "Richmond, Victoria, Australia",
    },
    {
      company: "REA Group (realestate.com.au)",
      title: "Software Engineer",
      location: "Richmond, Victoria, Australia",
    },
    {
      company: "Amazon Web Services (AWS)",
      title: "Software Development Engineer",
      location: "Sydney, New South Wales, Australia",
    },
    {
      company: "Deloitte",
      title: "Software Development Consultant",
      location: "Melbourne, Victoria, Australia",
    },
    {
      company: "The University of Melbourne",
      title: "Teaching Assistant",
      location: "Parkville, Victoria, Australia",
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
  school: string;
  degree: string;
  location: string;
  startDate?: Date;
  endDate?: Date;
}

interface Experience {
  company: string;
  title: string;
  location: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Resume {
  education: Education[];
  experience: Experience[];
}
```

:::
