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
    - `tsc`, the TypeScript compiler
    - Configure TypeScript environment
- Data Types
    - The primitives: `string`, `number`, and `boolean`
    - Arrays
    - `any`
    - Type Annotations on Variables
    - Functions
    - Object Types
    - Union Types
    - Type Aliases
    - Interfaces
    - Type Assertions
    - Literal Types
    - `null` and `undefined`
    - Enums
    - Less Common Primitives

## The Basics

TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

### `tsc`, the TypeScript compiler

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

### The primitives: `string`, `number`, and `boolean`

JavaScript has three very commonly used primitives: `string`, `number`, and `boolean`. Each has a corresponding type in
TypeScript.

```typescript
let var1: string = "Hello, world";
let var2: number = 42;
let var3: boolean = true;
```

### Arrays

To specify the type of an array like `[1, 2, 3]`, you can use the syntax `number[]`; this syntax works for any type
(e.g., `string[]` is an array of strings, and so on). You may also see this written as `Array<number>`, which means the
same thing.

```typescript
let var1: number[] = [1, 2, 3];
let var2: string[] = ['x', 'y', 'z'];
let var3: Array<number> = [1, 2, 3];
```

### `any`

TypeScript also has a special type, `any`, that you can use whenever you don’t want a particular value to cause
typechecking errors.

```typescript
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

### Type Annotations on Variables

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly
specify the type of the variable:

```typescript
let myName: string = "Alice";
```

### Functions

Functions are the primary means of passing data around in JavaScript. TypeScript allows you to specify the types of both
the input and output values of functions.

Parameter type annotation
```typescript
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

Return type annotation
```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

Function which returns a promise
```typescript
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

Anonymous function
```typescript
const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});
```

### Object Types

```typescript
// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 3, y: 7 });
```

Optional properties
```typescript
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

### Union Types

```typescript
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 });
```

