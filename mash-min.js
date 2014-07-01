/*!
 * mash.js v1.0.0
 * Functional prototype mixins
 * https://github.com/danro/mash
 * @license MIT
 */
var mash=function(n,t){if(!t){t=n;n={}}var e=n.prototype||n;t.call(e);n.create=function(){var t=n;if(typeof t!=="function"){t=function(){};t.prototype=e}var o=new t;if(typeof e.init==="function"){e.init.apply(o,arguments)}return o};n.mixin=function(n){t.call(n);return e};return n};if(typeof module!=="undefined"&&module.exports){module.exports=mash}