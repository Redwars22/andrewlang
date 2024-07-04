# 🧆 DATA STRUCTURES

## 🎳 ARRAYS

Arrays can be defined either by specifying a type for its elements or leaving it implicit: `let identifier:type[size]` or `let identifier[size]`. An element can be accessed by putting its index in square brackets. The first index is 0.

Elements of an array are put inside square brackets and separated by a comma. Multidimensional arrays follow the same schema as unidimensional arrays, but with some adaption: it’ll have more than one index, for example. i.e.: `let arr:int[4][4]` creates a two-dimensional array.

```tsx
let numbers:int[5] = [4,8,12,16,20];
let len:int = 5;
let i:int = 0;

while i < len {
	io.printLn(numbers[i]);
	i++;
}
```

There are some built-in methods for arrays too:

| Methods | Description |
| --- | --- |
| push(element) | pushes an element to the end of the array |
| length():int | returns the length of an array |
| pop() | removes the last element from an array  |

```tsx
let arr = [0, 1, 2, 3, 4, 5]

arr.push(6);
io.print("length: " + arr.length);
io.print("array: " + arr);
```