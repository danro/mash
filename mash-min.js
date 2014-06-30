/*!
 * mash.js v0.9.4
 * Functional prototype mixins
 * https://github.com/danro/mash
 * @license MIT
 */
var mash=function(t,n){if(!n){n=t;t={}}var e=t.prototype;if(e==={}.prototype){e=t}n.call(e);t.create=function(){var n=t;if(typeof n!=="function"){n=function(){};n.prototype=e}var o=new n;if(typeof e.init==="function"){e.init.apply(o,arguments)}return o};t.mixin=function(t){n.call(t);return e};return t};if(typeof module!=="undefined"&&module.exports){module.exports=mash}