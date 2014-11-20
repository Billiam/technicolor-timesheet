'use strict';

var PlatformStyle = require('app/lib/platformStyle');

/**
 * Options page controller
 * 
 * @class OptionsController
 * @constructor
 */
var OptionsController = function() {
};

var proto = OptionsController.prototype;

/**
 * Initialize controller
 * 
 * @method init
 */
proto.init = function() {
  PlatformStyle.setClass();
};

module.exports = OptionsController;