'use strict';

var Vue = require('app/view/vue');
var domready = require('app/service/domready');

/**
 * A view model for the options page
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
 * @return {Vue}
 * @private
 */
proto._createForm = function() {
  var self = this;
  return new Vue({
    el: this.target,
    data: this.formData,
    methods: {
      addRule: this._addRule.bind(this),
      saveRules: this._saveRules.bind(this)
    },
    created: function() {
      this.$on('sort-rules', self._reorder.bind(self));
      this.$on('remove-rule', self._removeRule.bind(self));
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
 * Move a rule to a new position
 * 
 * @method _reorder
 * @param {Number} oldIndex
 * @param {Number} newIndex
 * @private
 */
proto._reorder = function(oldIndex, newIndex) {
  this.formData.rules.moveRule(oldIndex, newIndex);
};

/**
 * Persist rules
 * 
 * @method _saveRules
 * @private
 */
proto._saveRules = function() {
  this.formData.rules.save().then(function() {
    console.log('save successful');
  }, function() {
    console.log('error in save');
  });
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