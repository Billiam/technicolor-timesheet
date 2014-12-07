var Vue = require('vue');
var template = require('app/view/template/ruleList');

Vue.component('rule-list', {
  template: template,
  methods: {
    removeRule: function(rule) {
      this.$dispatch('remove-rule', rule);
    }
  },
  paramAttributes: ['rules']
});
