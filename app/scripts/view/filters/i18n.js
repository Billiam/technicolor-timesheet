'use strict';

var Vue = require('vue');

/**
 * I18n Vue Filter 
 * 
 * Delegates translation work to chrome i18n
 * 
 * @class i18nFilter
 * @static
 */
Vue.filter('i18n', function(value) {
  return chrome.i18n.getMessage(value);
});