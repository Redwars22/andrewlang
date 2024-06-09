# 🛑 CONDITIONALS

The keyword `if` means that a block of code will be executed if a certain condition is satisfied. `if` must followed by a condition (without parenthesis).

`elif` does the same as `if`, but will only execute if the previous condition is not satisfied, then it will check for another condition to be true.

`else` executes a block of code only if the previous condition wasn’t true. In conditional statements, the operators `and`, `or`, `not`, `==`, `<`, `>`,`<=`, and `>=` are used.

```tsx
if x == 0 and not y < 2 {
	runA();
} elif x < 0 or y > 2 {
	runB();
} else {
	runC();
}
```

## ❓ TERNARY OPERATOR

The ternary operation is a shorthand for a conditional. This is the syntax for it: `condition ? valueIfTrue : valueIfFalse`.