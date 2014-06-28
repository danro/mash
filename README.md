# mash.js

I think I have some AOP in my OOP

demo: http://requirebin.com/?gist=c5b6944f89c7d02055ba

benchmark: http://jsperf.com/mash-vs-native

### Basic Example

```javascript
var foo = mash(function () {
  this.init = function () {
    console.log('hello mash');
  };
});

foo.create();
// hello mash
```

### Class Example

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
