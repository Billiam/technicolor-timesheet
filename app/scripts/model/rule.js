'use strict';

var Criteria = require('app/model/criteria');

/**
 * A timesheet rule which contains styles and conditions
 * 
 * Applies style information to {{crossLink "TimesheetEntry"}}{{/crossLink}}, based
 * on {{crossLink "Criteria"}}{{/crossLink}} matching
 * 
 * @class Rule
 * @param {Object} data Rule options
 * @param {String|null} data.color Text color
 * @param {String|null} data.bgColor Background color
 * @param {Array} data.conditions Array of individual conditions to test
 * @constructor
 */
var Rule = function(data) {
  /**
   * Raw rule data
   * 
   * @property data
   * @type {{color: (String|null), bgColor: (String|null), conditions: Array}}
   */
  this.data = data;

  /**
   * Criteria instance for delegation
   * 
   * @property criteria
   * @type {Criteria}
   */
  this.criteria = new Criteria(this.data.conditions);
};

var proto = Rule.prototype;

/**
 * Compare criteria to a {{crossLink "TimesheetEntry"}}{{/crossLink}} instance
 * 
 * @method matches
 * @param {TimesheetEntry} row The entry to test against 
 * @returns {Boolean} Whether row can be said to match this rule's criteria
 */
proto.matches = function(row) {
  return this.criteria.matches(row);
};

/**
 * The text color
 * 
 * @returns {String}
 */
proto.color = function() {
  return this.data.color;
};

/**
 * The background color
 * 
 * @returns {String}
 */
proto.backgroundColor = function() {
  return this.data.bgColor;
};

module.exports = Rule;