+++
slug = 'ts'
title = '💾 Knowledge Base: TypeScript'
date = 2024-06-11T13:46:16+10:00
draft = false
author = 'luojiahai'
+++

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Table of Contents

- The Basics
    - The TypeScript compiler
    - Configure TypeScript environment
- Data Types

## The Basics

TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

### The TypeScript compiler

Install the TypeScript Compiler `tsc` globally.
```shell
npm install -g typescript
```

Now let’s move to an empty folder and try writing our first TypeScript program: `hello.ts`:
```typescript
// Greets the world.
console.log("Hello world!");
```

Notice there are no frills here; this “hello world” program looks identical to what you’d write for a “hello world” program in JavaScript. And now let’s type-check it by running the command `tsc` which was installed for us by the `typescript` package.
```shell
tsc hello.ts
```

In our current directory, we see a `hello.js` file next to `hello.ts`. That’s the output from our `hello.ts` file after `tsc` compiles or transforms it into a plain JavaScript file.

### Configure TypeScript environment

Make a directory. In the directory root, run:
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

## Data Types

TODO
