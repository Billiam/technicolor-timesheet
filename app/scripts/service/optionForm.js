'use strict';

var Vue = require('app/view/vue');
var domready = require('app/service/domready');

/**
 * A form object for the options page
 * 
 * @class OptionForm
 * @param {String} target Selector to bind view object to
 * @param {Object} data View data
 * @constructor
 */
var OptionForm = function(target, data) {
  this.target = target || '#option_form';
  
  this.formData = data;
};

var proto = OptionForm.prototype;

/**
 * Create the form view
 * 
 * @method _createForm
 * @returns {Vue}
 * @private
 */
proto._createForm = function() {
  return new Vue({
    el: this.target,
    data: this.formData,
    methods: {
      addRule: this._addRule.bind(this),
      removeRule: this._removeRule.bind(this)
    }
  });
};

/**
 * Create a form instance when the dom is loaded
 * 
 * @method init
 */
proto.init = function() {
  domready.then(function() {
    this.form = this._createForm();
  }.bind(this));
};

/**
 * Add a rule to the rules collection
 * 
 * @method _addRule
 * @private
 */
proto._addRule = function() {
  this.formData.rules.addRule();
};

/**
 * Remove a rule from the rules collection
 * 
 * @param {Rule} rule The rule to remove
 * @private
 */
proto._removeRule = function(rule) {
  this.formData.rules.removeRule(rule);
};

module.exports = OptionForm;