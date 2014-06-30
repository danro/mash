/*!
 * mash.js v0.9.3
 * Functional prototype mixins
 * https://github.com/danro/mash
 * @license MIT
 */
var mash = function (base, mixin) {
  // Default base to an empty object
  if (!mixin) { mixin = base; base = {}; }

  var proto = base.prototype;

  // Modify objects directly instead of Object.prototype
  if (proto === {}.prototype) { proto = base; }

  // Run the mixin over the prototype (or base object)
  mixin.call(proto);

  // Factory method to create instance + init
  base.create = function () {
    var ctor = base;
    if (typeof ctor !== 'function') {
      ctor = function () {};
      ctor.prototype = base;
    }
    var inst = new ctor();
    if (typeof inst.init === 'function') {
      inst.init.apply(inst, arguments);
    }
    return inst;
  };

  // Allow the mixin to be run on another object
  base.mixin = function (obj) {
    mixin.call(obj);
    return proto;
  };

  // Provide a reference to the now-modified base
  return base;
};

// Export module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = mash;
}
