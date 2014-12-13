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
  
  var colors = this._getColors(rule.color());
  
  styles['.timesheet .data_table tr.' + ruleClass(rule)] = {
    '&:hover td': {
      'background-color': colors.highlight
    },
    '& td': {
      'background-color': colors.background,
      'border-left': '1px solid ' + colors.border,
      'color': colors.text
    },
    '& td a': {
      'color': colors.text
    }
  };
  
  this.stylesheet.addRules(styles);
};

/**
 * Fetch a set of style colors from a base color
 * 
 * @param {String} color Base color
 * @return {Object}
 * @private
 */
proto._getColors = function(color) {
  return {
    background: color,
    highlight: tinycolor(color).brighten(20).toHexString(),
    border: tinycolor(color).lighten(15).toHexString(),
    text: tinycolor.mostReadable(color, TEXT_COLORS).toHexString()
  };
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