'use strict';
/* global chrome, Promise */

var Rule = require('app/model/rule');

var tinycolor = require('tinycolor2');
var store = chrome.storage.sync;
var RULES_KEY = 'rules';

/**
 * A collection of rules to apply to the timesheet
 * 
 * 
 * @class Rules
 * @param {Rule[]} rules Array of Rule instances
 * @constructor
 */
var Rules = function(rules) {
  this.data = rules;
};

/**
 * Fetch the raw collection data from storage and return as a promise
 */
Rules._getRulesData = function() {
  return new Promise(function(resolve) {
    var request = {};
    request[RULES_KEY] = [];
    
    store.get(request, function(data) {
      resolve(data[RULES_KEY]);
    });
  });
};

/**
 * Convert an array of rules data to {{#crossLink "Rule"}}{{/crossLink}} instances
 * 
 * @method _parseRules
 * @param {Object[]} rules Array of raw rules data
 * @private
 */
Rules._parseRules = function(rules) {
  return rules.map(function(rule) {
    return new Rule(rule);
  });
};

/**
 * Wrap an array of rules in a Rules collection instance
 * 
 * @method _createCollection
 * @param {Rule[]} data 
 * @return {Rules}
 * @private
 */
Rules._createCollection = function(data) {
  return new Rules(data);
};

/**
 * Fetch an array of available {{#crossLink "Rule"}}{{/crossLink}} instances
 * 
 * @static
 * @method getRules
 * @return {Promise} A promise that will be fulfilled with a Rules collection
 */
Rules.getRules = function() {
  return this._getRulesData()
    .then(this._parseRules)
    .then(this._createCollection);
};

var proto = Rules.prototype;

/**
 * Persist current rule data
 * 
 * @method save
 * @return {Promise}
 */
proto.save = function() {
  var promise = new Promise(function(resolve, reject) {
    if ( ! this.isValid()) {
      reject();
      return;
    }
    
    var request = {};
    
    request[RULES_KEY] = this._getData();
    
    store.set(request, function() {
      resolve();
    });
  }.bind(this));
  
  //promise rejection method stub
  promise.catch(function() { });
  
  return promise;
};

/**
 * Fetch raw rules data for persistence
 * 
 * @method _getData
 * @return {Array}
 * @private
 */
proto._getData = function() {
  return this.data.map(function(rule) {
    return rule.toJson();
  });
};

/**
 * Whether rules data is valid
 * 
 * @method isValid
 * @return {boolean}
 */
proto.isValid = function() {
  var valid = true;
  this.data.forEach(function(rule) {
    if ( ! rule.isValid()) {
      valid = false;
    }
  });
  return valid;
};

/**
 * Create a new rule
 * 
 * @method addRule
 */
proto.addRule = function() {
  this.data.push(new Rule(this._defaultData()));
};

/**
 * Move a rule to a new position
 * 
 * @param {Number} oldPosition
 * @param {Number} newPosition
 */
proto.moveRule = function(oldPosition, newPosition) {
  if(this.data[oldPosition] != null && this.data[newPosition] != null) {
    this.data.splice(newPosition, 0, this.data.splice(oldPosition, 1)[0]);
  }
};

/**
 * Generate default data for new Rules
 * 
 * @method _defaultData
 * @return {Object}
 * @private
 */
proto._defaultData = function() {
  return {
    color: tinycolor('#CEFFCC').spin(Math.floor(Math.random() * 720 - 360)).toHexString()
  };
};

/**
 * Remove a single rule from the collection
 * 
 * @method removeRule
 * @param {Rule} rule
 */
proto.removeRule = function(rule) {
  var index = this.data.indexOf(rule);
  if (index !== -1) {
    this.data.splice(index, 1);
  }
};

module.exports = Rules;