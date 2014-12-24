'use strict';

var Vue = require('vue');
var template = require('app/view/template/rule');

/**
 * @class RuleComponent
 * @static
 */
Vue.component('rule', {
  template: template,
  replace: true,
  inherit: true
});
