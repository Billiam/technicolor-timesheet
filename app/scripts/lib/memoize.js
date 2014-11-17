'use strict';

module.exports = function(fn) {
  var memo = {};
  return function() {
    var slice = Array.prototype.slice;
  
    var args = slice.call(arguments);
  
    if (args in memo) {
      return memo[args];
    } else {
      return (memo[args] = fn.apply(this, args));
    }
  };
};