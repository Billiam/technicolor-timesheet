'use strict';

var Criterion = require('app/model/criterion');

/**
 * A collection of criterion instances, allowing tests for 'all match'  and 'any match'
 * 
 * @class Criteria
 * @param {String} type either "any" or "all" 
 * @param {Array} criteria Array of criterion data
 * @constructor
 */
var Criteria = function(type, criteria) {
  /**
   * Comparison type (any or all)
   * 
   * @property type
   * @type String
   */
  this.type = type;

  /**
   * Method called on array of criterion objects when testing for matches
   *
   * @private
   * @property _matchMethod
   * @type String
   */
  this._matchMethod = type === 'any' ? 'some': 'every';

  /**
   * Collection of criterion instances
   * @property criteria
   * @type Criterion[]
   */
  this.criteria = criteria.map(function(criterion) {
    return new Criterion(criterion);
  });
};

var proto = Criteria.prototype;

/**
 * Test whether a row matches any/all criteria
 * 
 * @method matches
 * @param {TimesheetEntry} row The entry to test
 * @return {Boolean} Whether entry can be said to match criteria
 */
proto.matches = function(row) {
  return this.criteria[this._matchMethod](function(criterion) {
    return criterion.matches(row);
  }, this);
};

module.exports = Criteria;