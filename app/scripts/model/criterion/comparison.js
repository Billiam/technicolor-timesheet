'use strict';

/**
 * @class Comparison
 * @static
 */
var Comparison = function() {
};

/**
 * 
 * @param {Boolean} regex
 * @param {*} value
 * @returns {Function}
 */
Comparison.create = function(regex, value) {
  if (regex) {
    return this.regex(value);
  } else {
    return this.simple(value);
  }
};

/**
 * Returns a comparator which tests a value using a regular expression
 * 
 * @method regexCompare
 * @private
 * @param {*} value The criterion to use during the test
 * @return {Function}
 */
Comparison.regex = function(value) {
  var regex = new RegExp(value, 'i');
  
  return function(field) {
    return field != null && regex.test(field);
  };
};

/**
 * Returns a comparator which tests a value using an equality check
 * 
 * @method simpleCompare
 * @private
 * @param {*} value The criterion to use during the test
 * @return {Function}
 */
Comparison.simple = function(value) {
  return function(field) {
    return value === field;
  };
};

module.exports = Comparison;
