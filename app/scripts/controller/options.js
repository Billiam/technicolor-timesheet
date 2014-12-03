'use strict';

var PlatformStyle = require('app/lib/platformStyle');
var Rules = require('app/model/rules');

var OptionForm = require('app/service/optionForm');

/**
 * Options page controller
 * 
 * @class OptionsController
 * @constructor
 */
var OptionsController = function() {
  this.viewData = {
    rules: null
  };
};

var proto = OptionsController.prototype;

/**
 * Initialize controller
 * 
 * @method init
 */
proto.init = function() {
  PlatformStyle.init();

  this.initRules()
    .then(this.initView.bind(this));
};

proto.initRules = function() {
  return Rules.getRules();
};

proto.initView = function(rules) {
  this.viewData.rules = rules;
  this.form = new OptionForm('#container', this.viewData);
  this.form.init();
};

module.exports = OptionsController;