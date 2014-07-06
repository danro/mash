/*!
 * mash.js v1.0.1
 * Functional prototype mixins
 * https://github.com/danro/mash
 * @license MIT
 */
var mash = function (base, mixin, options) {
  'use strict';

  // Default base to an empty object
  if (!mixin) { mixin = base; base = {}; }

  // Modify the prototype or base object
  var proto = base.prototype || base;
  mixin.call(proto, options);

  // Factory method to create instance + init
  base.create = function () {
    var M = base;
    if (typeof M !== 'function') {
      M = function () {};
      M.prototype = proto;
    }
    var inst = new M();
    if (typeof proto.init === 'function') {
      proto.init.apply(inst, arguments);
    }
    return inst;
  };

  // Allow the mixin to be run on another object
  base.mixin = function (obj, options) {
    mixin.call(obj, options);
    return proto;
  };

  // Provide a reference to the now-modified base
  return base;
};

// Export module
if (typeof module !== 'undefined' && module.exports) {
  module.exports = mash;
} else {
  this.mash = mash;
}
