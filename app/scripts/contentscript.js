'use strict';

var TimesheetScraper = require('app/model/timesheetScraper');
//var Rules = require('app/model/rules');


/**
 * @module TechnicolorTimeshee
 * @class ContentScript
 * @constructor
 */
var ContentScript = function() {
};

ContentScript.prototype.init = function() {
  var scraper = new TimesheetScraper(document);
  
  scraper.entries().then(function(entries) {
    console.log(entries);
  });
};

new ContentScript().init();