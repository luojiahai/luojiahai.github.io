+++
slug = 'typescript-functions'
title = 'TypeScript: Functions'
date = 2024-06-14T20:00:00+10:00
draft = false
author = 'luojiahai'
+++

Functions are the basic building block of any application, whether they’re local functions, imported from another
module, or methods on a class.

## Function Type Expressions

```typescript
function greeter(fn: (a: string) => void) {
  fn("Hello, World");
}
 
function printToConsole(s: string) {
  console.log(s);
}
 
greeter(printToConsole);
```

The syntax `(a: string) => void` means "a function with one parameter, named `a`, of type `string`, that doesn't have a
return value".

## Call Signatures

```typescript
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
 
function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";
 
doSomething(myFunc);
```

## Construct Signatures

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

## Generic Functions

```typescript
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
 
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}
```

## Optional Parameters

```typescript
function f(x?: number) {
  // ...
}
```

```typescript
function f(x = 10) {
  // ...
}
```

## Function Overloads

```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

## Other Types to Know About

### `void`

`void` represents the return value of functions which don't return a value.

```typescript
// The inferred return type is void
function noop() {
  return;
}
```

### `object`

The special type `object` refers to any value that isn't a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`,
`null`, or `undefined`).

### `unknown`

The `unknown` type represents any value. This is similar to the `any` type, but is safer because it's not legal to do
anything with an `unknown` value.

```typescript
function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b(); // 'a' is of type 'unknown'.
}
```

### `never`

The `never` type represents values which are *never* observed. In a return type, this means that the function throws an
exception or terminates execution of the program.

```typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```

### `Function`

This is an *untyped function call* and is generally best avoided because of the unsafe `any` return type.

```typescript
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

## Rest Parameters and Arguments

### Rest Parameters

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

### Rest Arguments

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

## Parameter Destructuring

```typescript
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```

## Assignability of Functions

Contextual typing with a return type of `void` does **not** force functions to **not** return something.

```typescript
type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};
```

---
