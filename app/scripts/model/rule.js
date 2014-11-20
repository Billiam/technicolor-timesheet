'use strict';

var Criteria = require('app/model/criteria');
var uid = require('app/lib/uid');

/**
 * A timesheet rule which contains styles and conditions
 * 
 * Applies style information to {{#crossLink "TimesheetEntry"}}{{/crossLink}}, based
 * on {{#crossLink "Criteria"}}{{/crossLink}} matching
 * 
 * @class Rule
 * @param {Object} data Rule options
 * @param {String|null} data.color Row color
 * @param {String} data.ruleType Type of condition testing
 * @param {Array} data.conditions Array of individual conditions to test
 * @constructor
 */
var Rule = function(data) {
  /**
   * Raw rule data
   * 
   * @property data
   * @type {{color: (String|null), conditions: Array}}
   */
  this.data = data;

  /**
   * Criteria instance for delegation
   * 
   * @property criteria
   * @type {Criteria}
   */
  this.criteria = new Criteria(this.data.ruleType, this.data.conditions);

  /**
   * Unique identifier for this rule
   * 
   * @property id
   * @type {Number}
   */
  this.id = uid();
};

var proto = Rule.prototype;

/**
 * Compare criteria to a {{#crossLink "TimesheetEntry"}}{{/crossLink}} instance
 * 
 * @method matches
 * @param {TimesheetEntry} row The entry to test against 
 * @return {Boolean} Whether row can be said to match this rule's criteria
 */
proto.matches = function(row) {
  return this.criteria.matches(row);
};

/**
 * The row color
 * 
 * @return {String}
 */
proto.color = function() {
  return this.data.color;
};

module.exports = Rule;