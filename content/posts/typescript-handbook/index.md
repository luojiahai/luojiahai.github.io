+++
slug = 'typescript-handbook'
title = 'TypeScript: Handbook'
date = 2024-06-11T13:46:16+10:00
draft = false
author = 'luojiahai'
+++

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## The Basics

TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support
tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable,
standards-based JavaScript.

### `tsc`, the TypeScript compiler

Install the TypeScript Compiler `tsc` globally.
```shell
npm install -g typescript
```

Now let's move to an empty folder and try writing our first TypeScript program: `hello.ts`:
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

## Everyday Types

### The primitives: `string`, `number`, and `boolean`

```typescript
let var1: string = "Hello, world";
let var2: number = 42;
let var3: boolean = true;
```

### Arrays

```typescript
let var1: number[] = [1, 2, 3];
let var2: string[] = ['x', 'y', 'z'];
let var3: Array<number> = [1, 2, 3];
```

### `any`

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

### Type Aliases

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

### Interfaces

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

#### Differences Between Type Aliases and Interfaces

Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features
of an interface are available in type, the key distinction is that a type cannot be re-opened to add new properties vs
an interface which is always extendable.

### Type Assertions

```typescript
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

```typescript
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

### Literal Types

```typescript
const constantString = "Hello World";
```

### `null` and `undefined`

```typescript
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

### Enums

```typescript
enum Direction {
  Up = 1,
  Down,
  Left,
  Right,
}
```

### Less Common Primitives

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

## Narrowing

### `typeof` type guards

```typescript
function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {  // 'strs' is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}
```

### Truthiness narrowing

```typescript
function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
```

#### Equality narrowing

```typescript
function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();  // (method) String.toUpperCase(): string
    y.toLowerCase();  // (method) String.toLowerCase(): string
  } else {
    console.log(x);  // (parameter) x: string | number
    console.log(y);  // (parameter) y: string | boolean
  }
}
```

#### The `in` operator narrowing

```typescript
type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
  return animal.fly();
}
```

#### `instanceof` narrowing

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());  // (parameter) x: Date
  } else {
    console.log(x.toUpperCase());  // (parameter) x: string
  }
}
```

#### Assignments

```typescript
let x = Math.random() < 0.5 ? 10 : "hello world!";  // let x: string | number

x = 1;  // let x: string
console.log(x);

x = "goodbye!";  // let x: string
console.log(x);

x = true;  // Type 'boolean' is not assignable to type 'string | number'.
console.log(x);
```

#### Control flow analysis

```typescript
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5;  // let x: boolean
  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello";  // let x: string
    console.log(x);
  } else {
    x = 100;  // let x: number
    console.log(x);
  }

  return x;  // let x: string | number
}
```

#### Using type predicates

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
 
// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});
```

#### Assertion functions

```typescript
function multiply(x, y) {
  assert(typeof x === "number");
  assert(typeof y === "number");
  return x * y;
}
```

`asserts val is string` ensures that after any call to `assertIsString`, any variable passed in will be known to be a
`string`.
```typescript
function assertIsString(val: any): asserts val is string {
  if (typeof val !== "string") {
    throw new AssertionError("Not a string!");
  }
}
```

More sophisticated sssertion signatures
```typescript
function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  if (val === undefined || val === null) {
    throw new AssertionError(
      `Expected 'val' to be defined, but received ${val}`
    );
  }
}
```

### Discriminated unions

```typescript
interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;  // (parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2;  // (parameter) shape: Square
  }
}
```

### The `never` type

When narrowing, you can reduce the options of a union to a point where you have removed all possibilities and have
nothing left. In those cases, TypeScript will use a never type to represent a state which shouldn't exist.

### Exhaustiveness checking

The never type is assignable to every type; however, no type is assignable to never (except never itself). This means
you can use narrowing and rely on never turning up to do exhaustive checking in a switch statement.

```typescript
type Shape = Circle | Square;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}
```

## More on Functions

### Function Type Expressions

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

### Call Signatures

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

### Construct Signatures

```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

### Generic Functions

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

### Optional Parameters

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

### Function Overloads

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

### Other Types to Know About

#### `void`

`void` represents the return value of functions which don't return a value.

```typescript
// The inferred return type is void
function noop() {
  return;
}
```

#### `object`

The special type `object` refers to any value that isn't a primitive (`string`, `number`, `bigint`, `boolean`, `symbol`,
`null`, or `undefined`).

#### `unknown`

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

#### `never`

The `never` type represents values which are *never* observed. In a return type, this means that the function throws an
exception or terminates execution of the program.

```typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```

#### `Function`

This is an *untyped function call* and is generally best avoided because of the unsafe `any` return type.

```typescript
function doSomething(f: Function) {
  return f(1, 2, 3);
}
```

### Rest Parameters and Arguments

#### Rest Parameters

```typescript
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
```

#### Rest Arguments

```typescript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
arr1.push(...arr2);
```

### Parameter Destructuring

```typescript
function sum({ a, b, c }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```

### Assignability of Functions

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
