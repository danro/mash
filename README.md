# mash.js

I think I have some AOP in my OOP

install: `npm install mash-js`

size: `< 1 kB`

### What it does

Mash uses mixin functions to modify objects and prototypes.

When you `mash(object, mixin)` mash will attempt to apply the mixin to the object's prototype. Mash will revert to plain objects if no prototype or object was found.

Then, two methods will be added to the mashed object:

#### mashed.create( arg1, arg2, ... argN )
> Create an instance of your mashed object. This will auto-invoke any `init` method found on the instance, passing along the arguments.
>
> **Returns:** the new instance.

#### mashed.mixin( object, options )
> Run the same mixin on another object. See [class mixins](#class-mixins).
>
> **Returns:** a reference to the mashed object's prototype.

### Performance

```
Measuring raw prototype access..
[mash.js mixins] x 6,404,834 ops/sec ±0.41% (100 runs sampled)
[native prototypes] x 6,248,419 ops/sec ±0.32% (94 runs sampled)
Fastest is [mash.js mixins]

Measuring constructor abstractions..
[mash.js create] x 4,838,249 ops/sec ±0.33% (100 runs sampled)
[coffee class] x 5,568,587 ops/sec ±0.35% (99 runs sampled)
[p.js init] x 4,353,508 ops/sec ±0.50% (100 runs sampled)
Fastest is [coffee class]
```

(very fast)

## Basic objects

demo: http://jsbin.com/xipat/8/edit?js,console

```javascript
var greeting = mash(function () {
  this.init = function (prefix) {
    console.log(prefix + ' mash');
  };
});

var yo = greeting.create('yo');
// 'yo mash'

Object.getPrototypeOf(yo) === greeting;
// true
```

## Class mixins

demo: http://jsbin.com/micil/8/edit?js,console

```javascript
function Animal() {}
mash(Animal, function() {
  this.init = function(name) {
    this.name = name;
  };

  this.move = function(meters) {
    console.log(this.name + ' moved ' + meters + 'm.');
  };
});

function Snake() {}
mash(Snake, function () {
  var supr = Animal.mixin(this);

  this.move = function() {
    console.log('Slithering...');
    supr.move.call(this, 5);
  };
});

function Horse() {}
mash(Horse, function () {
  var supr = Animal.mixin(this);

  this.move = function() {
    console.log('Galloping...');
    supr.move.call(this, 45);
  };
});

var sam = Snake.create('Sammy the Python');
var tom = Horse.create('Tommy the Palomino');
sam.move();
tom.move();

// Slithering...
// Sammy the Python moved 5m.
// Galloping...
// Tommy the Palomino moved 45m.

```

## Functional mixins

demo: http://jsbin.com/borat/8/edit?js,console

```javascript
var withSword = function () {
  this.slash = function (dmg) {
    console.log('Sword slash for ' + dmg + ' damage!');
  };
};

var withMagic = function () {
  this.fireball = function (dmg) {
    console.log('Cast fireball for ' + dmg + ' damage!');
  };
};

function Hero() {}
mash(Hero, function () {
  withSword.call(this);
  withMagic.call(this);

  this.attack = function (enemy) {
    console.log('Hero attacks the ' + enemy);
    this.slash(25);
    this.fireball(80);
  };
});

var hero = new Hero();
hero.attack('Orc');

// Hero attacks the Orc
// Sword slash for 25 damage!
// Cast fireball for 80 damage!
```

## Contributing

`npm install` to install testing libs.

`npm test` to make sure tests pass :)

`npm run bench` for a good time

## MIT License

This code may be freely distributed under the [MIT license](http://danro.mit-license.org/).

--

https://www.youtube.com/watch?v=OH0n_Ew2YDM
