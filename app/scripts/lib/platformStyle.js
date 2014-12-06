'use strict';

var domready = require('app/service/domready');

/**
 * Add platform-specific classes to body element for styling
 * 
 * @class PlatformStyle
 * @static
 */
var PlatformStyle = function() {};

var proto = PlatformStyle.prototype;

/**
 * Fetch a class name based on user agent
 * 
 * @method _getClass
 * @return {string}
 * @private
 */
proto._getClass = function() {
  switch(true) {
    case(navigator.userAgent.indexOf('Windows') !== -1):
      return 'windows';
    case(navigator.userAgent.indexOf('Macintosh') !== -1):
      return 'mac';
    case(navigator.userAgent.indexOf('CrOS') !== -1):
      return 'cros';
    default:
      return 'linux';
  }
};

/**
 * Initialize platform-specific styles, set body class
 * 
 * @method init
 */
proto.init = function() {
  domready.then(function() {
    document.body.classList.add(this._getClass());
  }.bind(this));
};

module.exports = new PlatformStyle();