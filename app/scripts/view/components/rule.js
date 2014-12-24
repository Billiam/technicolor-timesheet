'use strict';

var Vue = require('vue');
var template = require('app/view/template/rule');

/**
 * @class RuleListComponent
 * @static
 */
Vue.component('rule', {
  template: template,
  replace: true,
  inherit: true,
  computed: {
    errors: function() {
      return this.$data.errors.errorMessages();
    }
  }
});
