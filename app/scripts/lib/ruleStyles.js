'use strict';

var jss = require('app/lib/jss');
var ruleClass = require('app/lib/ruleClass');
var tinycolor = require('tinycolor2');

var TEXT_COLORS = ['#555557', '#eee'];

/**
 * Creates stylesheet entries based on rules
 * 
 * @class RuleStyles
 * @param {Rule[]} rules
 * @constructor
 */
var RuleStyles = function(rules) {
  this._rules = rules;
};

var proto = RuleStyles.prototype;

/**
 * Apply a single rule to the current stylesheet
 * 
 *     //creates styles as follows
 *     .timesheet .data_table tr.technicolor-1:hover td {
 *         background-color: #337333;
 *     }
 *     .timesheet .data_table tr.technicolor-1 td {
 *         background-color: #004000;
 *         border-left: 1px solid #008c00;
 *         color: #eeeeee;
 *     }
 *     .timesheet .data_table tr.technicolor-1 td a {
 *         color: #eeeeee;
 *     }
 * 
 * @method _applyRule
 * @param {Rule} rule
 * @private
 */
proto._applyRule = function(rule) {
  var styles = {};
  
  var bgColor = tinycolor(rule.color());
  var highlightColor = tinycolor(rule.color()).brighten(20);
  
  var textColor = tinycolor.mostReadable(bgColor, TEXT_COLORS).toHexString();
  
  styles['.timesheet .data_table tr.' + ruleClass(rule)] = {
    '&:hover td': {
      'background-color': highlightColor.toHexString()
    },
    '& td': {
      'background-color': rule.color(),
      'border-left': '1px solid ' + bgColor.lighten(15).toHexString(),
      'color': textColor
    },
    '& td a': {
      'color': textColor
    }
  };
  
  this.stylesheet.addRules(styles);
};

/**
 * Create stylesheet and apply all rules
 * 
 * @method render
 */
proto.render = function() {
  if ( this.stylesheet) {
    this.stylesheet.detach();
    this.stylesheet = null;
  }
  
  this.stylesheet = jss.createStyleSheet().attach();
  
  this._rules.forEach(this._applyRule, this);
};

module.exports = RuleStyles;