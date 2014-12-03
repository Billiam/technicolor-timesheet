'use strict';

var ractive = require('ractive');
var template = require('./criteria.mustache');

var Criteria = ractive.extend({
  isolated: false,
  template: template
});

module.exports = Criteria;