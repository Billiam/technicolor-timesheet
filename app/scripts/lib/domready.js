'use strict';

/* global Promise */
var promise = new Promise(function(resolve) {
  if(document.readyState === 'complete') {
    resolve();
  } else {
    document.addEventListener('DOMContentLoaded', resolve, false);
  }
});
  
module.exports = promise;