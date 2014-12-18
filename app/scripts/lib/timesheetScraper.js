'use strict';

var domReady = require('app/service/domready');
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
 * Fetch timesheet nodes from the dom
 * 
 * @method _findRows
 * @return {Promise} Promise which resolves with an array of dom nodes
 * @private
 */
proto._findRows = function() {
  return domReady.then(function() {
    var rows = this.document.getElementById(TIMESHEET_ID).querySelectorAll(ROW_SELECTOR);
    
    return Array.prototype.slice.call(rows);
  }.bind(this));
};
/**
 * Map dom nodes to {{#crossLink "TimesheetEntry"}}{{/crossLink}} instances
 * 
 * @method entries
 * @return {Promise} Promise which resolves to an array of {{#crossLink "TimesheetEntry"}}{{/crossLink}} instances
 */
proto.entries = function() {
  return this._findRows().then(function(rows) {
    return rows.map(function(row) {
      return new TimesheetEntry(row);
    });
  }.bind(this));
};

module.exports = TimesheetScraper;