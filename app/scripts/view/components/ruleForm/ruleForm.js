'use strict';

var ractive = require('ractive');
var template = require('./form.mustache');
var Criteria = require('./criteria');

var RuleItem = ractive.extend({
  isolated: false,
  template: template,
  components: {
    criteria: Criteria
  }
});

module.exports = RuleItem;