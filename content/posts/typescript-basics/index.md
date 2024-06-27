+++
slug = 'typescript-basics'
title = 'TypeScript: Basics'
date = 2024-06-11T20:00:00+10:00
draft = true
author = 'luojiahai'
+++

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## `tsc`, the TypeScript compiler

Install the TypeScript Compiler `tsc` globally.

```shell
npm install -g typescript
```

Now let's move to an empty folder and try writing our first TypeScript program: `hello.ts`.

```typescript
// Greets the world.
console.log("Hello world!");
```

Notice there are no frills here; this "hello world" program looks identical to what you'd write for a "hello world"
program in JavaScript. And now let's type-check it by running the command `tsc` which was installed for us by the
`typescript` package.

```shell
tsc hello.ts
```

In our current directory, we see a `hello.js` file next to `hello.ts`. That's the output from our `hello.ts` file after
`tsc` compiles or transforms it into a plain JavaScript file.

## Configure TypeScript environment

```shell
tsc --init
```

Now, the TypeScript configuration file `tsconfig.json` is generated in the directory root.

```json
{
  "compilerOptions": {
    "target": "es6",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
  }
}
```

---
