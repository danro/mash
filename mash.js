/*!
 * mash.js v1.0.0
 * Functional prototype mixins
 * https://github.com/danro/mash
 * @license MIT
 */
var mash = function (base, mixin) {
  // Default base to an empty object
  if (!mixin) { mixin = base; base = {}; }

  // Modify the prototype or base object
  var proto = base.prototype || base;
  mixin.call(proto);

  // Factory method to create instance + init
  base.create = function () {
    var ctor = base;
    if (typeof ctor !== 'function') {
      ctor = function () {};
      ctor.prototype = proto;
    }
    var inst = new ctor();
    if (typeof proto.init === 'function') {
      proto.init.apply(inst, arguments);
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
