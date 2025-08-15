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
    },
    {
      school: "The University of Melbourne",
      degree: "Bachelor of Science",
    },
    {
      school: "Peking University",
      degree: "Summer School International Program",
    },
  ],
  experience: [
    {
      company: "REA Group (realestate.com.au)",
      title: "Senior Software Engineer",
    },
    {
      company: "REA Group (realestate.com.au)",
      title: "Software Engineer",
    },
    {
      company: "Amazon Web Services (AWS)",
      title: "Software Development Engineer",
    },
    {
      company: "Deloitte",
      title: "Software Development Consultant",
    },
    {
      company: "The University of Melbourne",
      title: "Teaching Assistant",
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
}

interface Experience {
  company: string;
  title: string;
}

export interface Resume {
  education: Education[];
  experience: Experience[];
}
```

:::

> <small>
> Disclaimer: I’m using TypeScript just to make it easier for you to read, not because I like it.
> </small>
