/*!
 * mash.js v0.8.0
 * Functional prototype mixins
 * https://gist.github.com/danro/5812ab430f041a3b7728
 * MIT License
 */
function mash(base, mixin) {
  // Default base to an empty object
  if (!mixin) { mixin = base; base = {}; }

  var proto = base.prototype;

  // Modify objects directly instead of Object.prototype
  if (proto === {}.prototype) proto = base;

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
  base.mash = function (obj) {
    mixin.call(obj);
    return proto;
  };

  // Provide a reference to the now-modified base
  return base;
}
