'use strict';

var ruleClass = require('app/lib/ruleClass');

var TimesheetStyler = function(entries, rules) {
  this.entries = entries;
  this.rules = rules;
};

var proto = TimesheetStyler.prototype;

proto._applyRules = function(entry) {
  this.rules.some(function(rule) {
    if (rule.matches(entry)) {
      entry.setClass(ruleClass(rule));
      return true;
    }
    return false;
  }, this);
};

proto._testEntries = function() {
  this.entries.forEach(function(entry) {
    this._applyRules(entry);
  }, this);
};

proto.apply = function() {
  this._testEntries();
};

module.exports = TimesheetStyler;