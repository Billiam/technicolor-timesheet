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

  /**
   * Whether criterion is active
   * 
   * @property enabled
   * @type {Boolean}
   */
  this.enabled = data.enabled;
  
  /**
   * Criterion column to test
   * 
   * @property column
   * @type {String}
   */
  this.column = data.column;

  /**
   * Value to compare to column
   * 
   * @property value
   * @type {String}
   */
  this.value = data.value;

  /**
   * Whether comparison should be treated as a regular expression
   * 
   * @property regex
   * @type {Boolean}
   */
  this.regex = data.regex;

  /**
   * Compare an entry value to the stored criterion value
   * 
   * @method compare
   * @param {*} value The entry value to test
   * @return {Boolean} Whether the match is valid
   */
  this.compare = this._getComparison();
};

/**
 * List of criteria columns
 * 
 * @static
 * @property VALID_COLUMNS
 * @type {string[]}
 */
Criterion.VALID_COLUMNS = [
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
  var regex = new RegExp(value, 'i');
  
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
  };
};

/**
 * Check whether criterion data is valid
 * 
 * @static
 * @method isValid
 * @param data Criterion data
 * @return {boolean} Data validity 
 */
Criterion.isValid = function(data) {
  return this.VALID_COLUMNS.indexOf(data.column) !== -1;
};

var proto = Criterion.prototype;


/**
 * Generate a method to use for criterion tests
 * 
 * @method _getComparison
 * @return {Function}
 * @private
 */
proto._getComparison = function() {
  return this.regex ? regexCompare(this.value) : simpleCompare(this.value);
};

proto.isValid = function() {
  return Criterion.isValid(this.toJson());
};

proto.toJson = function() {
  return {
    column: this.column,
    value: this.value,
    regex: this.regex
  };
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
  return row[this.column]();
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