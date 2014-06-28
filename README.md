# mash.js

I think I have some AOP in my OOP

benchmark: http://jsperf.com/mash-vs-native

### Basic Example

http://requirebin.com/?gist=c5b6944f89c7d02055ba

```javascript
var foo = mash(function () {
  this.init = function () {
    console.log('hello mash');
  };
});

foo.create();
// hello mash
```

### Multiple Inheritance

http://requirebin.com/?gist=4303d388b67fa29cdd85

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
  withSword.mash(this);
  withMagic.mash(this);

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

### Class Inheritance

http://requirebin.com/?gist=8b2726653fc41cf9b5c4

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
  var supr = Animal.mash(this);

  this.move = function() {
    console.log('Slithering...');
    supr.move.call(this, 5);
  };
});

function Horse() {}
mash(Horse, function () {
  var supr = Animal.mash(this);

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
