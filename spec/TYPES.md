# 🔣 TYPES

Type annotation is optional. If left out, it will be automatically inferred.

| Type | Equivalent in C | Description |
| --- | --- | --- |
| str | char[] | string |
| char | char | single character |
| int | int | integer number |
| float | float | float number |
| double | double | double number |
| bool | bool | boolean value (true or false) |

## 🪄 TYPE CASTING

You can cast a type to another type by using this syntax: `<type>(value)`. It currently only works for assign statements like the one below:

```tsx
let x = "1"
let y = "1"

x = <int>(x)
y = <int>(y)

io.print(x + y);
```