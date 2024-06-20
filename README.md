AndrewLang is an experimental project created by AndrewNation for a programming language that can be transpilled to JavaScript. The goal is to create an alternative language to JavaScript, easier to learn for newbies and people who already know and use JS everyday. In the future, a AndrewLang to C++ transpiller will be written.

Goals:
- Easier to learn for JS users
- Cleaner syntax
- Easier to write code
- Easier to understand code
- Interoperability with and migration from existing JS code

JavaScript code:
```ts
const PI = 3.14;

function CircleArea(r) {
    return PI * Math.pow(r, 2);
}

console.log(CircleArea(2.8));
```

AndrewLang code:
```ts
const PI = 3.14;

fun CircleArea(r) {
    ret PI * Math.pow(r, 2);
}

io.print(CircleArea(2.8));
```

[Read the spec document here]()

# Getting started
Please run `node andrew.js input output` to transpile AndrewLang code to JavaScript. The first argument is the input file and the last one is the output file (the result of the transpilation to JS).