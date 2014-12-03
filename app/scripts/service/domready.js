'use strict';

/* global Promise */
module.exports = new Promise(function(resolve) {
  if(document.readyState === 'complete') {
    resolve();
  } else {
    document.addEventListener('DOMContentLoaded', resolve, false);
  }
});