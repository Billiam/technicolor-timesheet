'use strict';

var domReady = require('app/lib/domready');
var TimesheetEntry = require('app/model/timesheetEntry');

/**
 * Class which fetches and maps timesheet entry dom nodes to {{#crossLink "TimesheetEntry"}}{{/crossLink}} instances
 * 
 * @class TimesheetScraper
 * @param {Document} dom
 * @constructor
 */
var TimesheetScraper = function(dom) {
  /**
   * Dom instance
   * 
   * @property document
   * @type {Document}
   */
  this.document = dom;
};

var TIMESHEET_ID = 'time_entries';
var ROW_SELECTOR = '.entry_row';

var proto = TimesheetScraper.prototype;

/**
 * Fetch {{#crossLink "TimesheetEntry"}}{{/crossLink}} entries from the DOM
 * 
 * @method entries
 * @return {Promise} Promise which resolves to an array of {{#crossLink "TimesheetEntry"}}{{/crossLink}} instances
 */
proto.entries = function() {
  return domReady.then(function() {
    var nodes = this.document.getElementById(TIMESHEET_ID).querySelectorAll(ROW_SELECTOR);
    var rows = [];
    for (var i = 0, l=nodes.length; i < l; i++) {
      rows.push(new TimesheetEntry(nodes[i]));
    }
    
    return rows;
  }.bind(this));
};

module.exports = TimesheetScraper;