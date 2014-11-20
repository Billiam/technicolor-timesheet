'use strict';

var PREFIX_REGEX = /^\s*(.+?)\s*:/i;

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

  /**
   * Stores the row class so that it can be removed later
   * 
   * @property rowClass
   * @type {null|string}
   */
  this.rowClass = null;

  /**
   * Cache for dom access methods
   * 
   * @property cache
   * @type {{}}
   */
  this.cache = {};
};

var proto = TimesheetEntry.prototype;

/**
 * Replaces the class on the item row
 * 
 * @method setClass
 * @param {String} className
 */
proto.setClass = function(className) {
  this.removeClass();
  
  this.rowClass = className;
  this.row.classList.add(className);
};

/**
 * Remove the existing class from the row, if any
 * 
 * @method removeClass
 */
proto.removeClass = function() {
  if (this.rowClass) {
    this.row.classList.remove(this.rowClass);
    this.rowClass = null;
  }
};

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
 * Cache the output of a method
 * 
 * @method _cache
 * @param {String} method
 * @returns {*}
 * @private
 */
proto._cache = function(method) {
  if ( ! Object.prototype.hasOwnProperty(this.cache, method)) {
    this.cache[method] = this[method]();
  }
  
  return this.cache[method];
};

/**
 * Create a cached version of a method
 * 
 * @method _cachedMethod
 * @param {String} method
 * @returns {Function}
 * @private
 */
proto._cachedMethod = function(method) {
  return function() {
    return this._cache(method);
  };
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
  proto[method] = proto._cachedMethod('_' + method);
});

module.exports = TimesheetEntry;