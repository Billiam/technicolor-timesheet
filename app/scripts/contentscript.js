'use strict';

var TimesheetScraper = require('app/model/timesheetScraper');
var TimesheetStyler = require('app/model/timesheetStyler');
var Rules = require('app/model/rules');
var RuleStyles = require('app/model/ruleStyles');

/**
 * @module TechnicolorTimeshee
 * @class ContentScript
 * @constructor
 */
var ContentScript = function() {
};

var proto = ContentScript.prototype;

proto._initStyles = function(entries, rules) {
  new RuleStyles(rules).render();
  new TimesheetStyler(entries, rules).apply();
};

/* global Promise */
proto.init = function() {
  var scraper = new TimesheetScraper(document);
  var rulesRepo = new Rules();
  
  Promise.all([scraper.entries(), rulesRepo.getRules()]).then(function(results) {
    this._initStyles(results[0], results[1]);
  }.bind(this));
};

new ContentScript().init();