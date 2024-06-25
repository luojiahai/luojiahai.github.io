+++
slug = 'typescript-narrowing'
title = 'TypeScript: Narrowing'
date = 2024-06-13T13:00:00+10:00
draft = false
author = 'luojiahai'
+++

```typescript
function padLeft(padding: number | string, input: string): string {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input; // (parameter) padding: number
  }
  return padding + input; // (parameter) padding: string
}
```

## `typeof` type guards

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

## Truthiness narrowing

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

### Equality narrowing

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

### The `in` operator narrowing

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

### `instanceof` narrowing

```typescript
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());  // (parameter) x: Date
  } else {
    console.log(x.toUpperCase());  // (parameter) x: string
  }
}
```

### Assignments

```typescript
let x = Math.random() < 0.5 ? 10 : "hello world!";  // let x: string | number

x = 1;  // let x: string
console.log(x);

x = "goodbye!";  // let x: string
console.log(x);

x = true;  // Type 'boolean' is not assignable to type 'string | number'.
console.log(x);
```

### Control flow analysis

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

### Using type predicates

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

### Assertion functions

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

## Discriminated unions

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

## The `never` type

When narrowing, you can reduce the options of a union to a point where you have removed all possibilities and have
nothing left. In those cases, TypeScript will use a never type to represent a state which shouldn't exist.

## Exhaustiveness checking

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

---
