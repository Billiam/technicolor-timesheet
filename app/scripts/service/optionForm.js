'use strict';

var Vue = require('app/view/vue');
var domready = require('app/service/domready');

var OptionForm = function(target, data) {
  this.target = target || '#option_form';
  
  this.formData = data;
};

var proto = OptionForm.prototype;

proto._createForm = function() {
  return new Vue({
    el: this.target,
    data: this.formData
  });
};

proto.init = function() {
  domready.then(function() {
    this.form = this._createForm();
    this._bind();
  }.bind(this));
};

proto._addRule = function() {
  this.formData.rules.addRule();
};

proto._removeRule = function(ruleId) {
  this.formData.rules.removeById(ruleId);
};

proto._bind = function() {
  this.form.on('add-rule', function() {
    this._addRule();
  }.bind(this));
  
  this.form.on('rule-form.remove-rule', function(event, ruleId) {
    this._removeRule(ruleId);
  }.bind(this));
};

module.exports = OptionForm;