'use strict';

var Vue = require('vue');

Vue.filter('i18n', function(value) {
  return chrome.i18n.getMessage(value);
});