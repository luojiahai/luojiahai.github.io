+++
slug = 'typescript-types'
title = 'TypeScript: Types'
date = 2024-06-12T20:00:00+10:00
draft = false
author = 'luojiahai'
+++

## The primitives: `string`, `number`, and `boolean`

```typescript
let var1: string = "Hello, world";
let var2: number = 42;
let var3: boolean = true;
```

## Arrays

```typescript
let var1: number[] = [1, 2, 3];
let var2: string[] = ['x', 'y', 'z'];
let var3: Array<number> = [1, 2, 3];
```

## `any`

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

## Type Annotations on Variables

When you declare a variable using `const`, `var`, or `let`, you can optionally add a type annotation to explicitly
specify the type of the variable:

```typescript
let myName: string = "Alice";
```

## Functions

### Parameter Type Annotations

```typescript
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
```

### Return Type Annotations

```typescript
function getFavoriteNumber(): number {
  return 26;
}
```

```typescript
// Function which returns a promise
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

### Anonymous Functions

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

## Object Types

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

## Union Types

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

Narrow the union with code
```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    // In this branch, id is of type 'string'
    console.log(id.toUpperCase());
  } else {
    // Here, id is of type 'number'
    console.log(id);
  }
}
```

## Type Aliases

A type alias is a name for any type.

```typescript
type Point = {
  x: number;
  y: number;
};
 
// Exactly the same as the earlier example
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

## Interfaces

An interface declaration is another way to name an object type.

```typescript
interface Point {
  x: number;
  y: number;
}
 
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

### Differences Between Type Aliases and Interfaces

Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features
of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs
an interface which is always extendable.

## Type Assertions

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

## Literal Types

```typescript
const constantString = "Hello World";
```

## `null` and `undefined`

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

## Enums

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

## Less Common Primitives

`bigint`
```typescript
// Creating a bigint via the BigInt function
const oneHundred: bigint = BigInt(100);
 
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;
```

`symbol`
```typescript
const firstName = Symbol("name");
const secondName = Symbol("name");
 
if (firstName === secondName) {
  // Can't ever happen
}
```

---
