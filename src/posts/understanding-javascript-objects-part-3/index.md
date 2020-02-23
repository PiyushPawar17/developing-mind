---
title: 'Understanding JavaScript Objects (Part 3)'
date: '2020-02-02'
spoiler: 'Applying "new" to functions and building it from scratch'
---

Till now we've seen how to handle `this` using `bind` function and achieving inheritance through `prototype`. In this post, we'll look at the behaviour of `new` when applied to functions. We'll also implement the functionality of `new` to get better understanding of what is happening under-the-hood. We are not going to talk about `new` been applied to `class` as of now. We'll be using ES5 syntax as such codes will be mostly in ES5 in real world.

## Applying `new` to functions

```js{9}
function Weapon(damage) {
	this.damage = damage;
}

Weapon.prototype.hit = function() {
	console.log(`Damage given: ${this.damage}`);
};

var sword = new Weapon(26);

sword.hit(); // Damage given: 26
```

The code must not confuse you if you've read the previous posts on JavaScript Objects. The thing that is unknown here is the `new` keyword. What exactly is it doing?

The very first thing that `new` does is create a new plain object with no properties in it. Then it will check on what we've called new on and check its prototype property and will set the prototype of the newly created empty object (with the `new` keyword) to be that object with the prototype. In the third step, JavaScript will again look at what we called new on (the function is referred to as constructor) and will call it, but it call it with the newly created object in the first step. In short, execute the constructor with `this`. Lastly, it returns the newly created object that is created, setting the prototype and executing the constructor.

And you probably didn't understand anything 😕. It's difficult to visualize these steps.

![No Idea](./no-idea.jpg)

The best way to understand what's going on will be to implement the functionality of `new` from scratch.

## Implementing `new`

Let's say there is no new keyword. We'll create our own new function. We've a `spawn` function that will act as our `new` keyword. The first step is to create a new empty object.

```js{10-11}
function Weapon(damage) {
	this.damage = damage;
}

Weapon.prototype.hit = function() {
	console.log(`Damage given: ${this.damage}`);
};

function spawn() {
	// Step 1 - Create a new empty object
	var obj = {};
}
```

The second step is to set the prototype. We want to set the prototype of `obj` to the prototype of `Weapon`. Hence, we'll take it as an argument in our function.

```js{13-14}
function Weapon(damage) {
	this.damage = damage;
}

Weapon.prototype.hit = function() {
	console.log(`Damage given: ${this.damage}`);
};

function spawn(constructor) {
	// Step 1 - Create a new empty object
	var obj = {};

	// Step 2 - Set the prototype of obj to the constructor's prototype
	Object.setPrototypeOf(obj, constructor.prototype);
}
```

The third step is to execute the constructor with `this` set to the newly created object. We will take the constructor and call `apply` on it. The `apply` function is same as the `bind` but it executes the function immediately and returns its value. You can learn more about `apply` [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply).

The `apply` takes an object as the first argument that we want to be have set as `this` (same as the `bind` function). The second argument for `apply` is the array of arguments that we want to call the function with. In our case, it will look like `[26]`, the `damage` argument. How do we create those array of arguments dynamically? In JavaScript, we have the `arguments` keyword that contains the values of the arguments passed to a function. Now, we've to just simply remove the first argument, i.e. the constructor, and we'll have the array of arguments. But we have one little issue. The `arguments` keyword is an object, not an array. We'll have to convert it into an array first.

```js{21-22}
function Weapon(damage) {
	this.damage = damage;
}

Weapon.prototype.hit = function() {
	console.log(`Damage given: ${this.damage}`);
};

function spawn(constructor) {
	// Step 1 - Create a new empty object
	var obj = {};

	// Step 2 - Set the prototype of obj to the constructor's prototype
	Object.setPrototypeOf(obj, constructor.prototype);

	// The `arguments` is not an array, so we first convert it into array
	// We can use Array.from(arguments) which will return an array and use `.slice` on it.
	// We are not using it as we are using ES5 syntax here
	var argsArray = Array.prototype.slice.apply(arguments);

	// Step 3 - Execute the constructor with `this`
	constructor.apply(obj, argsArray.slice(1));
}
```

The last step is to return the newly created object.

```js{24-25}
function Weapon(damage) {
	this.damage = damage;
}

Weapon.prototype.hit = function() {
	console.log(`Damage given: ${this.damage}`);
};

function spawn(constructor) {
	// Step 1 - Create a new empty object
	var obj = {};

	// Step 2 - Set the prototype of obj to the constructor's prototype
	Object.setPrototypeOf(obj, constructor.prototype);

	// The `arguments` is not an array, so we first convert it into array
	// We can use Array.from(arguments) which will return an array and use `.slice` on it.
	// We are not using it as we are using ES5 syntax here
	var argsArray = Array.prototype.slice.apply(arguments);

	// Step 3 - Execute the constructor with `this`
	constructor.apply(obj, argsArray.slice(1));

	// Step 4 - Return the newly created object
	return obj;
}
```

Now let's test our implementation of new.

```js{28}
function Weapon(damage) {
	this.damage = damage;
}

Weapon.prototype.hit = function() {
	console.log(`Damage given: ${this.damage}`);
};

function spawn(constructor) {
	// Step 1 - Create a new empty object
	var obj = {};

	// Step 2 - Set the prototype of obj to the constructor's prototype
	Object.setPrototypeOf(obj, constructor.prototype);

	// The `arguments` is not an array, so we first convert it into array
	// We can use Array.from(arguments) which will return an array and use `.slice` on it.
	// We are not using it as we are using ES5 syntax here
	var argsArray = Array.prototype.slice.apply(arguments);

	// Step 3 - Execute the constructor with `this`
	constructor.apply(obj, argsArray.slice(1));

	// Step 4 - Return the newly created object
	return obj;
}

var sword = spawn(Weapon, 26);

sword.hit(); // Damage given: 26
```

It's working 🎉🥳. We've implemented `new` from scratch.

## One weird edge case

If for some weird reason the constructor returns an object, then the `sword` will refer to that object. We'll have to modify the return statement a bit to solve this edge case.

```js{22}
// If constructor returns an object
function Weapon(damage) {
	this.damage = damage;
	return {
		dumbObject: true
	};
}

Weapon.prototype.hit = function() {
	console.log(`Damage given: ${this.damage}`);
};

function spawn(constructor) {
	var obj = {};
	Object.setPrototypeOf(obj, constructor.prototype);
	var argsArray = Array.prototype.slice.apply(arguments);

	return constructor.apply(obj, argsArray.slice(1)) || obj;
}

var sword = spawn(Weapon, 26);
console.log(sword); // { dumbObject: true }
sword.hit();
// .hit() is not a function because sword now refers to { dumbObject: true }
```

This behaviour will also occur if we use the `new` keyword. This is weird but it is the way that `new` behaves.

## Summary

-   The first thing `new` does is to create an empty object.
-   The second step is to set the prototype of the object to the constructor's prototype.
-   The third step is to execute the constructor with `this` that is set to newly created object.
-   The last step is to return the newly created object (Unless the constructor returns a object then it will return that object).

_Note: This series is heavily inspired by [Fun Fun Function's series on Object creation](https://www.youtube.com/playlist?list=PL0zVEGEvSaeHBZFy6Q8731rcwk0Gtuxub). The series may give you more insights as it has live coding examples._
