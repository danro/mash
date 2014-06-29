# mash.js

I think I have some AOP in my OOP

benchmark: http://jsperf.com/mash-vs-native/3

install: `npm install mash-js`

### What it does

Mash uses mixin functions to modify prototypes and objects.

When you `mash(object, mixin)` it will run the mixin as the object.

Additionally, two methods will be added to the object:

#### .create( [arguments] )
> Create an instance of your newly mashed prototype or object. This will auto-invoke any `init` method found on the instance, passing along the arguments.

#### .mixin( object )
> Run the same mixin on another object.

## Basic example

demo: http://jsbin.com/xipat/1/edit?js,console

```javascript
var foo = mash(function () {
  this.init = function () {
    console.log('hello mash');
  };
});

foo.create();
// hello mash
```

## Multiple inheritance

demo: http://jsbin.com/borat/1/edit?js,console

```javascript
var withSword = mash(function () {
  this.slash = function (dmg) {
    console.log('Sword slash for ' + dmg + ' damage!');
  };
});

var withMagic = mash(function () {
  this.fireball = function (dmg) {
    console.log('Cast fireball for ' + dmg + ' damage!');
  };
});

function Hero() {}
mash(Hero, function () {
  withSword.mixin(this);
  withMagic.mixin(this);

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

But what if a method gets replaced by mistake? [Just point to the one you want](http://jsbin.com/revus/1/edit?js,console).

## Class inheritance

demo: http://jsbin.com/micil/1/edit?js,console

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

--

https://www.youtube.com/watch?v=OH0n_Ew2YDM
