var Benchmark = require('benchmark');
var mash = require('../mash.js');

// -----------------------------------
var mashTest = (function () {

  function Canid() {}
  mash(Canid, function() {
    this.init = function(name) {
      this.name = name;
    };

    this.describe = function () {
      return this.name + ' ' + this.size + ' ' + this.color;
    };
  });

  function Wolf() {}
  mash(Wolf, function () {
    var supr = Canid.mixin(this);

    this.init = function (name, size) {
      supr.init.call(this, name);
      this.size = size;
      this.color = 'White';
    };
  });

  function Dingo() {}
  mash(Dingo, function () {
    var supr = Wolf.mixin(this);

    this.init = function (name, size) {
      supr.init.call(this, name);
      this.size = size;
      this.color = 'Red';
    };
  });

  return function () {
    var wolf = new Wolf();
    wolf.init('Ghost', '160cm');
    wolf.describe();

    var dingo = new Dingo();
    dingo.init('Patch', '60cm');
    dingo.describe();
  };
}());

// -----------------------------------
var nativeTest = (function () {

  function Canid() {}
  Canid.prototype.init = function (name) {
    this.name = name;
  };
  Canid.prototype.describe = function () {
    return this.name + ' ' + this.size + ' ' + this.color;
  };

  function Wolf() {}
  Wolf.prototype = Object.create(Canid.prototype);
  Wolf.prototype.constructor = Wolf;
  Wolf.prototype.init = function (name, size) {
    Canid.prototype.init.call(this, name);
    this.size = size;
    this.color = 'White';
  };

  function Dingo() {}
  Dingo.prototype = Object.create(Wolf.prototype);
  Dingo.prototype.constructor = Dingo;
  Dingo.prototype.init = function (name, size) {
    Wolf.prototype.init.call(this, name);
    this.size = size;
    this.color = 'Red';
  };

  return function () {
    var wolf = new Wolf();
    wolf.init('Ghost', '160cm');
    wolf.describe();

    var dingo = new Dingo();
    dingo.init('Patch', '60cm');
    dingo.describe();
  };
}());

// -----------------------------------
// Benchmark suite

console.log('Measuring raw prototype access..');

(new Benchmark.Suite)
.add('[mash.js mixins]', mashTest)
.add('[native prototypes]', nativeTest)

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  console.log();
})
.run();
