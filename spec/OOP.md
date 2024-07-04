# 🏀 OBJECT-ORIENTED PROGRAMMING

## 📦 CLASSES

Classes can be defined with the `class` keyword followed by its identifier. You can instantiate a class with the `new` keyword.

```tsx
class Car {
	//Attributes and methods 
}

let ford = new Car
```

### 🔧 ATTRIBUTES

You can access the attributes of a class by using the following syntax: `ClassName.attribute`.

### 🔧 METHODS

Methods can be defined the same way as functions but without the `fun` keyword. They can receive arguments and return values. Methods can be accessed the same way as attributes, using the dot syntax.

```tsx
class Car {
	accelerate(){
		self.setSpeed(self.getSpeed() + 1.25);
	}
}

let ford = new Car

ford.accelerate();
```

### 🪞 SELF KEYWORD

The `self` keyword refers to the current instance of an object.

```tsx
class Car {
	constructor(initialSpeed) {
		self.speed = initialSpeed;
	}
}
```

### ⚒️ CONSTRUCTOR

The constructor is a method named `constructor()` and is used to initialize an object with initial parameters or to execute some action when it is instantiated.

```tsx
class User {
	constructor(initialSpeed) {
		self.speed = initialSpeed;
	}
}
```

### 🚼 INHERITANCE

Inheritance is indicated by the `extends` keyword. `class X extends Y` means that the class X inherits from Y.

```tsx
class Car extends Vehicle {
	//Constructor and methods go here
}
```