'use strict';

var jss = require('jss');
var ruleClass = require('app/lib/ruleClass');
var tinycolor = require('tinycolor2');

var RuleStyles = function(rules) {
  this._rules = rules;
};

var proto = RuleStyles.prototype;

proto.render = function() {
  if ( this.stylesheet) {
    this.stylesheet.detach();
    this.stylesheet = null;
  }
  
  this.stylesheet = jss.createStylesheet().attach();
  
  this._rules.forEach(function(rule) {
    var styles = {};
    var colorObj = tinycolor(rule.color());
    var textColor = tinycolor.mostReadable(colorObj, ['#555557', '#eee']).toHexString();
    //content
    styles['.timesheet .data_table tr.' + ruleClass(rule) + ' td'] = {
      'background-color': rule.color(),
      'border-left': '1px solid ' + colorObj.lighten(15).desaturate().toHexString(),
      'color': textColor
    };
    styles['.timesheet .data_table tr.' + ruleClass(rule) + ' td a'] = {
      'color': textColor
    };
    
    this.stylesheet.addRules(styles);
  }, this);
};

module.exports = RuleStyles;