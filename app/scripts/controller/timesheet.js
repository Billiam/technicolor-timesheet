'use strict';

var TimesheetScraper = require('app/lib/timesheetScraper');
var TimesheetStyler = require('app/lib/timesheetStyler');
var Rules = require('app/model/rules');
var RuleStyles = require('app/lib/ruleStyles');

/* global Promise */

/**
 * Applies styles to timesheet entries
 * 
 * @class TimesheetController
 * @constructor
 */
var TimesheetController = function() {};

var proto = TimesheetController.prototype;

/**
 * Pass entry and rule data to styling classes
 * 
 * @method _initStyles
 * @private
 */
proto._initStyles = function() {
  new RuleStyles(this.rules.data).render();
  
  new TimesheetStyler(this.entries, this.rules.data).apply();
};

/**
 * Fetch timesheet entries and rules
 * 
 * @return {Promise}
 */
proto.fetchData = function() {
  var scraper = new TimesheetScraper(document);
  
  return Promise.all([scraper.entries(), Rules.getRules()])
    .then(function(results) {
      this.entries = results[0];
      this.rules = results[1];
    }.bind(this));
};

/**
 * Initialize controller
 * 
 * @method init
 */
proto.init = function() {
  this.fetchData().then(this._initStyles.bind(this));
};

module.exports = TimesheetController;