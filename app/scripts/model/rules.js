'use strict';
/* global chrome, Promise */

var Rule = require('app/model/rule');

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

Rules._setRulesData = function() {
};

/**
 * Convert an array of rules data to {{#crossLink "Rule"}}{{/crossLink}} instances
 */
Rules._parseRules = function(rules) {
  return rules.map(function(rule) {
    return new Rule(rule);
  });
};

Rules._createCollection = function(data) {
  return new Rules(data);
};

/**
 * Fetch an array of available {{#crossLink "Rule"}}{{/crossLink}} instances
 * 
 * @method getRules
 * @return {Promise} A promise that will be fulfilled with a Rules collection
 */
Rules.getRules = function() {
  return this._getRulesData()
    .then(this._parseRules)
    .then(this._createCollection);
};

var proto = Rules.prototype;

proto.addRule = function() {
  this.data.push(new Rule());
};

proto.removeById = function(id) {
  for (var i=this.data.length - 1; i >= 0; i--) {
    if(this.data[i].id === id) {
      this.data.splice(i, 1);
    }
  }
};

proto.removeRule = function(rule) {
  var index = this.data.indexOf(rule);
  if (index !== -1) {
    this.data.splice(index, 1);
  }
};

module.exports = Rules;