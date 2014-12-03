'use strict';

var ruleClass = require('app/lib/ruleClass');

/**
 * Apply classes to timesheet entries if they match rulesets
 * 
 * @class TimesheetStyler
 * @param {TimesheetEntry[]} entries
 * @param {Rules[]} rules
 * @constructor
 */
var TimesheetStyler = function(entries, rules) {
  this.entries = entries;
  this.rules = rules;
};

var proto = TimesheetStyler.prototype;

/**
 * Test a single timesheet entry for matching rules
 * 
 * @method _applyRules
 * @param {TimesheetEntry} entry
 * @private
 */
proto._applyRules = function(entry) {
  this.rules.some(function(rule) {
    if (rule.matches(entry)) {
      entry.setClass(ruleClass(rule));
      return true;
    }
    return false;
  }, this);
};

/**
 * Check all entries for matching rules
 * 
 * @method _testEntries
 * @private
 */
proto._testEntries = function() {
  this.entries.forEach(function(entry) {
    this._applyRules(entry);
  }, this);
};

/**
 * Apply classes to all matching timesheet entries
 * 
 * @method apply
 */
proto.apply = function() {
  this._testEntries();
};

module.exports = TimesheetStyler;