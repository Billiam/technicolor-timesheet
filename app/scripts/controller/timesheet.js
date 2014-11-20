'use strict';

var TimesheetScraper = require('app/model/timesheetScraper');
var TimesheetStyler = require('app/model/timesheetStyler');
var Rules = require('app/model/rules');
var RuleStyles = require('app/model/ruleStyles');

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
  new RuleStyles(rules).render();
  new TimesheetStyler(entries, rules).apply();
};

/**
 * Initialize controller
 * 
 * @method init
 */
proto.init = function() {
  var scraper = new TimesheetScraper(document);
  var rulesRepo = new Rules();

  /* global Promise */
  Promise.all([scraper.entries(), rulesRepo.getRules()]).then(function(results) {
    this._initStyles(results[0], results[1]);
  }.bind(this));
};

module.exports = TimesheetController;