'use strict';

var Vue = require('vue');

/**
 * @class ChromeLinkDirective
 * @static
 */
Vue.directive('chrome-link', {
  isLiteral: true,

  /**
   * Fetch the chrome url the bound element 
   * 
   * @method _url
   * @return {Boolean|String} URL, or false if required data is missing
   * @private
   */
  _url: function() {
    if (this.value != null) {
      return 'chrome://' + this.value;
    }
    return false;
  },

  /**
   * Handle click events, directing to chrome:// url
   * 
   * @method _click
   * @param {Event} e
   * @private
   */
  _click: function(e) {
    e.preventDefault();
    if (this.value) {
      chrome.tabs.update({ url: this._url() });
    }
  },

  /**
   * Update the stored value and href attribute if applicable
   * 
   * @param {String} value
   * @private
   */
  _update: function(value) {
    this.value = value;
    if (this.el.nodeName === 'A') {
      this.el.setAttribute('href', this._url());
    }
  },

  /**
   * Directive bind event handler
   * 
   * Update stored value and set up on click handler
   * 
   * @method bind
   */
  bind: function () {
    this._update(this.expression);
    this.el.addEventListener('click', this._click.bind(this));
  },

  /**
   * Directive update event handler
   * 
   * Update stored value
   * 
   * @method update
   * @param {String} value
   */
  update: function (value) {
    this._update(value);
  },

  /**
   * Directive unbind event handler
   * 
   * Remove click event listener
   * 
   * @method unbind
   */
  unbind: function () {
    this.el.removeEventListener('click', this._click);
  }
});