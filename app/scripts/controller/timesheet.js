'use strict';

var TimesheetScraper = require('app/lib/timesheetScraper');
var TimesheetStyler = require('app/lib/timesheetStyler');
var Rules = require('app/model/rules');
var RuleStyles = require('app/lib/ruleStyles');

/**
 * Applies styles to timesheet entries
 * 
 * @class TimesheetController
 * @constructor
 */
var TimesheetController = function() {
};

var proto = TimesheetController.prototype;

/**
 * Pass entry and rule data to styling classes
 * 
 * @method _initStyles
 * @param {TimesheetEntry[]} entries
 * @param {Rule[]} rules
 * @private
 */
proto._initStyles = function(entries, rules) {
  new RuleStyles(rules.data).render();
  new TimesheetStyler(entries, rules.data).apply();
};

/**
 * Initialize controller
 * 
 * @method init
 */
proto.init = function() {
  var scraper = new TimesheetScraper(document);

  /* global Promise */
  Promise.all([scraper.entries(), Rules.getRules()]).then(function(results) {
    this._initStyles(results[0], results[1]);
  }.bind(this));
};

module.exports = TimesheetController;