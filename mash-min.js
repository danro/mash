/*!
 * mash.js v1.0.1
 * Functional prototype mixins
 * https://github.com/danro/mash
 * @license MIT
 */
var mash=function(t,e,n){"use strict";if(!e){e=t;t={}}var i=t.prototype||t;e.call(i,n);t.create=function(){var M=t;if(typeof M!=="function"){M=function(){};M.prototype=i}var e=new M;if(typeof i.init==="function"){i.init.apply(e,arguments)}return e};t.mixin=function(t,n){e.call(t,n);return i};return t};if(typeof module!=="undefined"&&module.exports){module.exports=mash}else{this.mash=mash}