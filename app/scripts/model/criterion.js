'use strict';

/**
 * A single test for entry objects
 * 
 * @class Criterion
 * @param {Object} data Criterion options
 * @param {String} data.column A column to test in the incoming data
 * @param {Boolean} data.regex Whether the value should be evaluated with a regular expression
 * @param {String} data.value The value to test against 
 * @constructor
 */
var Criterion = function(data) {
  if ( ! this.isValid(data)) {
    throw "Data could not be validated: " + JSON.stringify(data);
  }
  /**
   * Criterion data
   * @property data
   * @type {{column: String, regex: Boolean, value: String}}
   */
  this.data = data;

  /**
   * Compare an entry value to the stored criterion value
   * 
   * @method compare
   * @param {*} value The entry value to test
   * @return {Boolean} Whether the match is valid
   */
  this.compare = _getComparison(data);
};

var VALID_COLUMNS = [
  'description',
  'descriptionPrefix',
  'workorder',
  'client',
  'flagged'
];

/**
 * Returns a comparator which tests a value using a regular expression
 * 
 * @method regexCompare
 * @private
 * @param {*} value The criterion to use during the test
 * @returns {Function}
 */
var regexCompare = function(value) {
  var regex = new RegExp(value, i);
  
  return function(field) {
    return regex.test(field);
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
var simpleCompare = function(value) {
  return function(field) {
    return value === field;
  }
};

/**
 * Generate a method to use for criterion tests
 * s
 * @method _getComparison
 * @param {Object} data Criterion data
 * @param {Boolean} data.regex Whether to test using regular expressions
 * @param {*} data.value The value to test against
 * @return {Function}
 * @private
 */
var _getComparison = function(data) {
  return data.regex ? regexCompare(data.value) : simpleCompare(data.value);
};

var proto = Criterion.prototype;

/**
 * Check whether criterion data is valid
 * 
 * @method isValid
 * @param data Criterion data
 * @return {boolean} Data validity 
 */
proto.isValid = function(data) {
  return VALID_COLUMNS.indexOf(data.column) !== -1;
};

/**
 * Fetch the results of a method call on the entry
 * 
 * @method _getValue
 * @param {TimesheetEntry} row The timesheet entry to test
 * @return {*}
 * @private
 */
proto._getValue = function(row) {
  return row[this.data.type]();
};

/**
 * Whether criterion matches a row
 * 
 * @param {TimesheetEntry} row The entry to test
 * @return {Boolean}
 */
proto.matches = function(row) {
  return this.compare(this._getValue(row));
};

module.exports = Criterion;