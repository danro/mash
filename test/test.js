var assert = require('assert');
var mash = require('../mash.js');

/*global describe*/
describe('mash', function () {

  describe('mashing objects', function () {
    // creates an object by default
    // directly modifies plain objects
    // does not modify Object.prototype
  });

  describe('mashing classes', function () {
    // modifies a function prototype
    // respects instanceof
    // respects .constructor
    // supports super methods
  });

  describe('create', function () {
    var withGun = mash(function () {
      this.init = function () {
        this.initCalled = true;
        this.initArgs = arguments;
      };
    });
    function Jack() {}
    mash(Jack, function () {
      this.init = function () {
        this.initCalled = true;
        this.initArgs = arguments;
      };
    });
    // is added to objects and classes
    // should call .init on instances
    // should not call .init on bare classes
    // maintains instanceof with bare classes
  });

  describe('mixin', function () {
    // is added to objects and classes
    // extends the passed object
    // is called in the object context
    // can be called multiple times
  });
});
