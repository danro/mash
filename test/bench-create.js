var Benchmark = require('benchmark');
var mash = require('../mash.js');
var P = require('pjs').P;

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
    var wolf = Wolf.create('Ghost', '160cm');
    wolf.describe();

    var dingo = Dingo.create('Patch', '60cm');
    dingo.describe();
  };
}());

// -----------------------------------
var coffeeTest = (function () {
  /* jshint ignore:start */

  var Canid, Dingo, Wolf, dingo, wolf,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Canid = (function() {
    function Canid(name) {
      this.name = name;
    }

    Canid.prototype.describe = function() {
      return this.name + ' ' + this.size + ' ' + this.color;
    };

    return Canid;

  })();

  Wolf = (function(_super) {
    __extends(Wolf, _super);

    function Wolf(name, size) {
      Wolf.__super__.constructor.call(this, name);
      this.size = size;
      this.color = 'White';
    }

    return Wolf;

  })(Canid);

  Dingo = (function(_super) {
    __extends(Dingo, _super);

    function Dingo(name, size) {
      Dingo.__super__.constructor.call(this, name);
      this.size = size;
      this.color = 'Red';
    }

    return Dingo;

  })(Wolf);
  /* jshint ignore:end */

  return function () {
    var wolf = new Wolf('Ghost', '160cm');
    wolf.describe();

    var dingo = new Dingo('Patch', '60cm');
    dingo.describe();
  };
}());

// -----------------------------------
var pjsTest = (function () {

  var Canid = P(function (proto) {
    proto.init = function(name) {
      this.name = name;
    };

    proto.describe = function () {
      return this.name + ' ' + this.size + ' ' + this.color;
    };
  });

  var Wolf = P(Canid, function (proto, supr) {
    proto.init = function (name, size) {
      supr.init.call(this, name);
      this.size = size;
      this.color = 'White';
    };
  });

  var Dingo = P(Wolf, function (proto, supr) {
    proto.init = function (name, size) {
      supr.init.call(this, name);
      this.size = size;
      this.color = 'Red';
    };
  });

  return function () {
    var wolf = new Wolf('Ghost', '160cm');
    wolf.describe();

    var dingo = new Dingo('Patch', '60cm');
    dingo.describe();
  };
}());

// -----------------------------------
// Benchmark suite

console.log('Measuring constructor abstractions..');

(new Benchmark.Suite)
.add('[mash.js create]', mashTest)
.add('[coffee class]', coffeeTest)
.add('[p.js init]', pjsTest)

// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').pluck('name'));
  console.log();
})
.run();
