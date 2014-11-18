'use strict';

var PREFIX_REGEX = /^\s*(.+?)\s*:/i;

var memoize = require('app/lib/memoize');

/**
 * Model representing a single entry in the timesheet
 * 
 * @class TimesheetEntry
 * @param {HTMLElement} row
 * @constructor
 */
var TimesheetEntry = function(row) {
  /**
   * Timesheet row html instance
   * 
   * @property row
   * @type {HTMLElement}
   */
  this.row = row;
};

var proto = TimesheetEntry.prototype;

/**
 * Fetch description text from the description cell
 * 
 * @method _description
 * @return {String}
 * @private
 */
proto._description = function() {
  return this.row.querySelector('td.notes').textContent.trim();
};

/**
 * Fetch the prefix in the description
 * 
 * @method _descriptionPrefix
 * @return {String|null}
 * @private
 */
proto._descriptionPrefix = function() {
  var prefix = this.description().match(PREFIX_REGEX);

  if (prefix) {
    return prefix[1];
  }

  return null;
};

/**
 * Fetch the client name
 * 
 * @method _client
 * @return {String}
 * @private
 */
proto._client = function() {
  return this.row.querySelector('td.client').textContent.trim();
};

/**
 * Fetch the workorder number
 * 
 * @method _workorder
 * @return {String}
 * @private
 */
proto._workorder = function() {
  return this.row.querySelector('td.project').textContent.trim();
};

/**
 * Fetch the flagged state
 * 
 * @method _flagged
 * @return {Boolean}
 * @private
 */
proto._flagged = function() {
  return Boolean(this.row.querySelector('.flag_saved'));
};

/**
 * Fetch and cache row description
 * @method description
 * @return {String}
 */
/**
 * Fetch and cache description prefix
 * @method descriptionPrefix
 * @return {String|null}
 */
/**
 * Fetch and cache client name
 * @method client
 * @return {String}
 */
/**
 * Fetch and cache workorder number
 * @method workorder
 * @return {String}
 */
/**
 * Fetch and cache flagged status
 * @method flagged
 * @return {Boolean}
 */
['description','descriptionPrefix','client','workorder','flagged'].forEach(function(method) {
  proto[method] = memoize(proto['_' + method]);
});

module.exports = TimesheetEntry;