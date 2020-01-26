---
title: 'Understanding JavaScript Objects (Part 2)'
date: '2020-01-26'
spoiler: 'Achieving Inheritance through Prototype'
---

In the last part we saw how `this` can create a confusion and a way to handle it using `bind` function. In this post, we will be looking at `prototype`.

## What is a prototype?

In other object oriented programming languages, inheritance is done using a `class`. But in JavaScript, inheritance is achieved using `prototype`. In newer version of JavaScript we have a `class` keyword. So you might be thinking "Why am I learning this when there is already an easy way to do it?".

Firstly, `prototype` is not hard as you might think. It's a very simple and powerful inheritance model. Secondly, and most importantly, the `class` keyword is just a thin layer over `prototype`. It uses `prototype` under-the-hood. The `class` was added because developers were very familiar with it and get confused by `prototype` (and they don't want to learn a new thing 🤷🏻‍♂️). With that said, let us see `prototype` in action.

## Prototype in action 💻

We'll write a basic code and the results we get are expected.

```js
function attack() {
	console.log(this.damage);
}

const weapon = {
	attack
};

weapon.attack(); // undefined
```

This is an expected result as weapon does not have a `damage` property. Now, lets create a weapon that has damage property and use `prototype` for inheriting the `attack` method from `weapon`.

```js{13,15}
function attack() {
	console.log(this.damage);
}

const weapon = {
	attack
};

const sword = {
	damage: 34
};

Object.setPrototypeOf(sword, weapon);

sword.attack(); // 34
```

We set the `prototype` of `sword` to be `weapon` using `Object.setPrototypeOf()`. In some languages this can be written as `class Sword extends Weapon`. Best way to think about it is `sword` is derived from `weapon`, it will have all the properties of `weapon` in addition to some of its own. Technically speaking, `sword` will inherit from `weapon`.

When calling the `attack` method on `sword`, JavaScript looks if its present on it. If not found, it looks into the prototype. Since, we've set prototype of `sword` to be `weapon`, it will look into the `weapon` object and will find the `attack` method and use it. The `this` keyword will still refer be `sword` when calling `attack` even though the method exist on other object.

You can also setup a prototype chain which will be similar to having multi-level inheritance.

```js{19,23}
function attack() {
	console.log(this.damage);
}

const weapon = {
	attack
};

const sword = {
	damage: 34
};

const powerSword = {
	heavyAttack() {
		console.log(this.damage * 2);
	}
};

Object.setPrototypeOf(sword, weapon);

sword.attack(); // 34

Object.setPrototypeOf(powerSword, sword);

powerSword.heavyAttack(); // 68
```

Here, `sword` is the prototype of `powerSword` and `weapon` is the prototype of `sword`. Hence, `powerSword` is able to access the `damage` property and launch a heavy attack.

One important thing to understand is that prototypes are delegates, they do not create a copy of the original object. The `sword` object will delegate the prototype access to original object, i.e. `weapon`. Classes on the other hand create a copy from a blueprint. The easiest way to test this is change the function definition after setting the prototype.

```js{15-17}
function attack() {
	console.log(this.damage);
}

const weapon = {
	attack
};

const sword = {
	damage: 34
};

Object.setPrototypeOf(sword, weapon);

weapon.attack = function() {
	console.log('You cannot beat me');
};

sword.attack(); // You cannot beat me
```

The flow of calling the `attack` will be the same. JavaScript will look at `sword` for `attack`. It will not find it so it will look at its prototype which has the `attack` method. But, before calling it, JavaScript will see that the `attack` method is modified and will use the latest modified method. This is the reason we see "You cannot beat me" as the output.

The `Object.setPrototypeOf()` is not really used in real world applications nowadays as classes came along. But, it is important to understand the under-the-hood working of classes that uses `prototype`.

## Summary

-   Inheritance in JavaScript is achieved using `prototype`.
-   Classes use `prototype` under-the-hood.
-   Prototypes do not create a copy of the original object.
-   Prototype is a way of saying that for a object use the other object as a backup. If someone calls the object with a property that does not exist on it, look in that other object.

_Note: This series is heavily inspired by [Fun Fun Function's series on Object creation](https://www.youtube.com/playlist?list=PL0zVEGEvSaeHBZFy6Q8731rcwk0Gtuxub). The series may give you more insights as it has live coding examples._
