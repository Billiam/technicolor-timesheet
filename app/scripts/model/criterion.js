'use strict';

var Types = require('app/config/criteriaTypes');

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
  this.enabled = data.enabled !== false;
  
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
   * @type {*}
   */
  this.value = data.value == null ? '' : data.value;

  /**
   * Whether comparison should be treated as a regular expression
   * 
   * @property regex
   * @type {Boolean}
   */
  this.regex = data.regex || false;

  /**
   * Current validation status
   * 
   * @property valid
   * @type {boolean}
   */
  this.valid = true;
  
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
 * Returns a comparator which tests a value using a regular expression
 * 
 * @method regexCompare
 * @private
 * @param {*} value The criterion to use during the test
 * @return {Function}
 */
var regexCompare = function(value) {
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
  if (data.column == null || Types.fields[data.column] == null) {
    return false;
  }
  if (Types.fields[data.column].type === 'boolean') {
    //no further validation required
    return true;
  }
  
  if (data.value == null || (typeof data === 'string' && data.value.trim() === '')) {
    return false;
  }
  
  if ( data.regex) {
    try {
      new RegExp(data.value);
    } catch(e) {
      return false;
    }
  }
  
  return true;
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

/**
 * Whether criterion is valid
 * 
 * @method isValid
 * @return {boolean}
 */
proto.isValid = function() {
  this.valid = !this.enabled || Criterion.isValid(this.toJson());
  
  return this.valid;
};

/**
 * Criterion position, relative to other criteria
 * 
 * @method position
 * @return {Number}
 */
proto.position = function() {
  if (this._position == null) {
    this._position = Types.keys.indexOf(this.column);
  }
  return this._position;
};

/**
 * The type of data stored
 * 
 * Examples: string, boolean
 * 
 * @method fieldType
 * @return {String}
 */
proto.fieldType = function() {
  return Types.fields[this.column].type;
};

/**
 * Whether criterion uses a value field
 * 
 * @method hasValue
 * @return {boolean}
 */
proto.hasValue = function() {
  return this.fieldType() === 'string';
};

/**
 * Convert criterion data to simple json object
 * 
 * @method toJson
 * @return {}
 */
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