---
title: 'Understanding JavaScript Objects (Part 6)'
date: '2020-02-24'
spoiler: 'The class keyword'
---

Till now we saw various concepts related to objects in JavaScript, how they are implemented, how they work (sometimes in a weird way). This post is no different where we understand objects, this time with the help of the newly added `class` keyword. We'll see what the `class` keyword is and there is nothing like classes in JavaScript.

![What](./what.jpg)

## Using the `class` keyword

As many other languages, the way we create classes is pretty much the same. We use the `class` keyword and then give the class name and then use `new` keyword to create an object.

```js
class Weapon {
	constructor(damage) {
		this.damage = damage;
	}

	hit() {
		return this.damage;
	}
}

const sword = new Weapon(33);
console.log(sword.hit()); // 33
```

Also, as other languages, JavaScript classes can also inherit from other classes.

```js{11}
class Weapon {
	constructor(damage) {
		this.damage = damage;
	}

	hit() {
		return this.damage;
	}
}

class Bow extends Weapon {
	constructor() {
		super(55);
	}
}

const bow = new Bow();

console.log(bow.hit()); // 55
```

This is the behavior that we expect. But, as everyone knows, JavaScript is weird. Although JavaScript have classes, there is no way we can make the members private. Developers use an \_ before the name (ex. `_damage`) to convey that the member should be considered as private. Still, anyone can access it and change it. There is no trick to make members private.

There is a [TC39 proposal](https://github.com/tc39/proposal-private-methods) at Stage 3 at the time when I'm writing this blog which aims to add actual implementation of private methods and accessors (getter/setter) to the language itself.

Why JavaScript does not have the basic functionality that every other Object Oriented Programming language has? Because there are no classes in JavaScript. This is just an illusion. In one of the [previous](https://blog.piyushpawar.dev/understanding-javascript-objects-part-3) posts, we saw how the `new` keyword works. The `new` keyword can be used on the constructor functions to create object and fake the functionality of classes. The `class` keyword in the newest version of JavaScript (ES6) is no different. It's just another syntax for the developers that aren't familiar with JavaScript.

Here's the proof that there are no classes in JavaScript.

```js{11}
class Weapon {
	constructor(damage) {
		this.damage = damage;
	}

	hit() {
		return this.damage;
	}
}

console.log(typeof Weapon); // function
```

See? The `Weapon` class we just created is nothing but a function. The inheritance is also the prototypal inheritance that we've discussed [earlier](https://blog.piyushpawar.dev/understanding-javascript-objects-part-2). This means that the `hit` method is present on the `prototype` of `Weapon`.

```js{13}
class Weapon {
	constructor(damage) {
		this.damage = damage;
	}

	hit() {
		return this.damage;
	}
}

const hit = Weapon.prototype.hit();

console.log(hit); // undefined
```

But, why do we get undefined? Because the `damage` property is `undefined` (You should have known that if you've read the previous posts).

## Using our knowledge

We saw that the `class` keyword is just a **syntactic sugar** over the [function constructors](https://blog.piyushpawar.dev/understanding-javascript-objects-part-4). This means that we can use the `prototype` property to access the methods or even add new methods. These methods are just normal functions on the `prototype` of the function constructor.

In the above example we get `undefined` as a result when we call the `hit` method. How do we overcome it? We just saw that these are just normal functions and normal function has access to the `bind` function that we saw in the [first post](https://blog.piyushpawar.dev/understanding-javascript-objects-part-1). We can use it to bind that function to an object that has the `damage` property and it will log the expected result.

```js{11,13}
class Weapon {
	constructor(damage) {
		this.damage = damage;
	}

	hit() {
		return this.damage;
	}
}

const hit = Weapon.prototype.hit.bind({ damage: 20 })();

console.log(hit); // 20
```

Another thing we can do is.

```js{13}
class Weapon {
	constructor(damage) {
		this.damage = damage;
	}

	hit() {
		return this.damage;
	}
}

const sword = new Weapon(33);

console.log(Weapon.prototype.isPrototypeOf(sword)); // true
```

This proves that we just use prototypes.

This concludes this series on understanding the JavaScript objects. JavaScript can be weird language at times, but, if you know how it works, it's not that weird as you think.

## Summary

-   There is nothing like `class` in JavaScript.
-   The `class` keyword is just a **syntactic sugar** over function constructors.
-   Inheritance is achieved through prototypal inheritance (as in the Function constructors).

_Note: This series is heavily inspired by [Fun Fun Function's series on Object creation](https://www.youtube.com/playlist?list=PL0zVEGEvSaeHBZFy6Q8731rcwk0Gtuxub). The series may give you more insights as it has live coding examples._
