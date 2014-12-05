'use strict';

var Vue = require('vue');

Vue.directive('chrome-link', {
  isLiteral: true,
  
  _url: function() {
    if (this.value != null) {
      return 'chrome://' + this.value;
    }
    return false;
  },
  
  _click: function(e) {
    e.preventDefault();
    if (this.value) {
      chrome.tabs.update({ url: this._url() });
    }
  },
  
  _update: function(value) {
    this.value = value;
    if (this.el.nodeName === 'A') {
      this.el.setAttribute('href', this._url());
    }
  },
  
  bind: function () {
    this._update(this.expression);
    this.el.addEventListener('click', this._click.bind(this));
  },
  
  update: function (value) {
    this._update(value);
  },
  
  unbind: function () {
    this.el.removeEventListener('click', this._click);
  }
});