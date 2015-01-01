'use strict';

var Vue = require('vue');
var translate = require('app/service/translate');


/**
 * @class ChromeLinkDirective
 * @static
 */
  
var transcluder = {
  /**
   * Fetch an elements child nodes, combining comment nodes into previous element array items
   * 
   * @method fetchElements
   * @private
   * @param {HTMLElement} parent
   * @returns {Array}
   */
  fetchElements: function(parent) {
    var elements = [];
    
    [].forEach.call(parent.childNodes, function(el, i) {
      if(el.nodeType == Node.COMMENT_NODE && elements.length > 0) {
        //append comment nodes to previous element list
        elements[i-1].push(el);
      } else if (el.nodeType == Node.ELEMENT_NODE) {
        elements.push([el]);
      }
    });
    
    return elements;
  },

  /**
   * Tokenize a string with replacement content, returning text and dom nodes
   * 
   * @method tokenify
   * @private
   * @param {String} string Template string
   * @param {Array} transclusions Items to insert into template string, as an array of arrays
   * @returns {HTMLElement[]}
   */
  tokenify: function(string, transclusions) {
    var tokens = [];
    
    string.split(/(%\d+)/).forEach(function(token) {
      var placeholder = token.match(/%(\d+)/);
      
      if(placeholder) {
        var transcludePosition = placeholder[1] - 1;
        
        if (transclusions[transcludePosition]) {
          tokens = tokens.concat(transclusions[transcludePosition]);
        }
      } else {
        tokens.push(document.createTextNode(token));
      }
    }, this);
    
    return tokens;
  }
};



Vue.directive('i18n-transclude', {
  isLiteral: true,
  /**
   * Read dom elements, create a token list, and append to directive element
   * 
   * @method bind
   */
  bind: function () {
    this.elements = transcluder.fetchElements(this.el);
    
    var template = translate(this.expression);
    var tokens = transcluder.tokenify(template, this.elements);
    
    Vue.nextTick(function() {
      tokens.forEach(function(token) {
        this.el.appendChild(token);
      }, this);
    }.bind(this));
  }
});