'use strict';
/* global chrome, Promise */

var Rule = require('app/model/rule');

/**
 * A collection of rules to apply to the timesheet
 * 
 * Fetches rule data from storage and maps to {#crossLink "Rule"}}{{/crossLink}} instances
 * 
 * @class Rules
 * @constructor
 */
var Rules = function() {

  /**
   * Rules storage engine
   * 
   * @property store
   * @type {chrome.storage}
   * @default chrome.storage.sync
   */
  this.store = chrome.storage.sync;

  /**
   * Rules promise
   * 
   * @property _rulesData
   * @type {Promise|null}
   * @private
   */
  this._rulesData = null;
};

var RULES_KEY = 'rules';

var proto = Rules.prototype;

/**
 * Fetch the raw collection data from storage and return as a promise
 * 
 * @method _getRulesData
 * @return {Promise} 
 * @private
 */
proto._getRulesData = function() {
  if ( ! this._rulesData) {
    this._rulesData = new Promise(function(resolve) {
      var request = {};
      request[RULES_KEY] = [];
      
      this.store.get(request, function(data) {
        resolve(data[RULES_KEY]);
      });
    }.bind(this));
  }
  return this._rulesData;
};

/**
 * Convert an array of rules data to {{#crossLink "Rule"}}{{/crossLink}} instances
 * 
 * @method _parseRules
 * @param rules {Array} rule data 
 * @return {Rule[]} Mapped rule instances
 * @private
 */
proto._parseRules = function(rules) {
  return rules.map(function(rule) {
    return new Rule(rule);
  });
};

/**
 * Fetch an array of available {{#crossLink "Rule"}}{{/crossLink}} instances
 * 
 * @method getRules
 * @return {Promise} A promise that will be fulfilled with {{#crossLink "Rule"}}{{/crossLink}} instances
 */
proto.getRules = function() {
  return this._getRulesData()
    .then(this._parseRules.bind(this));
};

module.exports = Rules;