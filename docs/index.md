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
export default {
  name: "luojiahai",
  selfProclaimedTitle: "non-senior earth resident",
  mbti: {
    code: "intj",
    identity: "assertive",
    name: "architect",
  },
  email: "luo[at]jiahai.co".replace("[at]", "@"),
  website: "luojiahai.com",
  languages: ["mandarin chinese", "cantonese chinese", "english"],
  professional: "software engineering",
};
```

```typescript [resume.ts] :line-numbers
// It is a preview of my resume. Full version available upon request.
// Please contact via LinkedIn with role and compensation details (Melbourne or remote only; no agency inquiries).

export default {
  education: [
    {
      institution: "The University of Melbourne",
      degree: "Master of Science (Computer Science)",
      location: "Parkville, Victoria, Australia",
    },
    {
      institution: "The University of Melbourne",
      degree: "Bachelor of Science",
      location: "Parkville, Victoria, Australia",
    },
    {
      institution: "Peking University",
      program: "Summer School International Program",
      location: "Beijing, China",
    },
  ],
  experience: [
    {
      company: "REA Group (realestate.com.au)",
      position: "Senior Software Engineer",
      location: "Richmond, Victoria, Australia",
    },
    {
      company: "REA Group (realestate.com.au)",
      position: "Software Engineer",
      location: "Richmond, Victoria, Australia",
    },
    {
      company: "Amazon Web Services (AWS)",
      position: "Software Development Engineer",
      location: "Sydney, New South Wales, Australia",
    },
    {
      company: "Deloitte",
      position: "Software Development Consultant",
      location: "Melbourne, Victoria, Australia",
    },
    {
      company: "The University of Melbourne",
      position: "Teaching Assistant",
      location: "Parkville, Victoria, Australia",
    },
  ],
};
```

:::
