var assert = require('assert');
var mash = require('../mash.js');

/*global describe, it */
describe('', function () {

  describe('mashing objects', function () {

    it('creates an object by default', function () {
      var obj = mash(function () {});
      assert.ok(obj === Object(obj));
    });

    it('directly modifies plain objects', function () {
      var obj = {};
      mash(obj, function () {
        this.mashedProp = 1;
      });
      assert.ok(obj.mashedProp === 1);
    });

    it ('returns the object', function () {
      var obj = {};
      var mashed = mash(obj, function () {});
      assert.ok(mashed === obj);
    });
  });

  describe('mashing classes', function () {

    function Klass() {}
    var mashed = mash(Klass, function () {
      this.mashedProp = 1;
      this.testSuper = function () { return this.mashedProp; };
    });

    it('modifies a function prototype', function () {
      assert.ok(Klass.prototype.mashedProp === 1);
    });

    it ('returns the function', function () {
      assert.ok(mashed === Klass);
    });

    it('respects instanceof', function () {
      assert.ok(new Klass instanceof Klass);
    });

    it('respects .constructor', function () {
      var k = new Klass;
      assert.ok(k.constructor === Klass);
    });

    it('supports super methods', function () {

      function SubKlass() {}
      mash(SubKlass, function () {
        var supr = Klass.mixin(this);

        this.testSuper = function () {
          this.mashedProp = 2;
          return supr.testSuper.call(this);
        };
      });

      var sk = new SubKlass;
      assert.ok(sk.testSuper() === 2);
      assert.ok(sk.testSuper === SubKlass.prototype.testSuper);
    });
  });

  describe('create', function () {

    var withGun = mash(function () {
      this.init = function () {
        this.initCalled = true;
        this.initArgs = arguments;
      };

      this.initCalled = false;
    });

    function Jack() {}
    mash(Jack, function () {
      this.init = function () {
        this.initCalled = true;
        this.initArgs = arguments;
      };

      this.initCalled = false;
    });

    it('is added to objects and class functions', function () {
      assert.ok(typeof withGun.create === 'function');
      assert.ok(typeof Jack.create === 'function');
      assert.ok(!Jack.prototype.create);
    });

    it('should call .init on prototypes', function () {
      assert.ok(withGun.create().initCalled);
      assert.ok(withGun.create('Pistol').initArgs[0] === 'Pistol');
      assert.ok(Jack.create().initCalled);
      assert.ok(Jack.create('Bauer').initArgs[0] === 'Bauer');
    });

    it('should not call .init on bare classes', function () {
      assert.ok(new Jack().initCalled === false);
    });

    it('should ignore invalid .init', function () {
      function Chloe() {}
      mash(Chloe, function () {
        this.init = 'sigh';
      });

      assert.ok(Chloe.create().init === 'sigh');
    });

    it ('uses prototype of mashed object', function() {
      assert.ok(Object.getPrototypeOf(withGun.create()) === withGun);
    });

    it ('uses prototype of mashed function', function() {
      assert.ok(Object.getPrototypeOf(Jack.create()) === Jack.prototype);
    });

    it('maintains instanceof', function () {
      assert.ok(Jack.create() instanceof Jack);
    });
  });

  describe('mixin', function () {

    var withGun = mash(function () {
      var proto = this;

      proto.hasGun = true;
      proto.context = function () {
        return proto;
      };
    });

    function Jack() {}
    mash(Jack, function () {
      var proto = this;
      withGun.mixin(proto);

      proto.isJack = true;
      proto.context = function () {
        return proto;
      };
    });

    it('is added to objects and classes', function () {
      assert.ok(typeof withGun.mixin === 'function');
      assert.ok(typeof Jack.mixin === 'function');
      assert.ok(!Jack.prototype.mixin);
    });

    it('extends the passed object', function () {
      var obj = {};
      withGun.mixin(obj);
      assert.ok(obj.hasGun === true);

      var person = {};
      Jack.mixin(person);
      assert.ok(person.isJack === true);
    });

    it('extends function prototypes', function () {
      assert.ok(new Jack().hasGun === true);
    });

    it('is called in the proper context', function () {
      var obj = {};
      withGun.mixin(obj);
      assert.ok(obj.context() === obj);

      var person = {};
      Jack.mixin(person);
      assert.ok(person.context() === person);

      function Klass() {}
      mash(Klass, function () {
        Jack.mixin(this);
      });
      assert.ok(new Klass().context() === Klass.prototype);
    });

    it('returns reference to prototype', function () {
      assert.ok(withGun.mixin() === withGun);
      assert.ok(Jack.mixin() === Jack.prototype);
    });
  });
});
