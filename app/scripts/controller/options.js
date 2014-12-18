'use strict';

var PlatformStyle = require('app/lib/platformStyle');
var Rules = require('app/model/rules');

var OptionView = require('app/view/optionView');

/**
 * Options page controller
 * 
 * @class OptionsController
 * @constructor
 */
var OptionsController = function() {
  /**
   * Container for data passed to the view
   * 
   * @property viewData
   * @type {{rules: null|Rules}}
   */
  this.viewData = {
    rules: null
  };
};

var proto = OptionsController.prototype;

/**
 * Initialize controller
 * 
 * Fetches rules then initializes the form
 * 
 * @method init
 */
proto.init = function() {
  PlatformStyle.init();

  this.initRules()
    .then(this.initView.bind(this));
};

/**
 * Return a promise which resolves to a rule collection
 * 
 * @method initRules
 * @return {Promise}
 */
proto.initRules = function() {
  return Rules.getRules();
};

/**
 * Create and initialize the view
 * 
 * @method initView
 * @param rules
 */
proto.initView = function(rules) {
  this.viewData.rules = rules;
  this.form = new OptionView('#container', this.viewData);
  this.form.init();
};

module.exports = OptionsController;