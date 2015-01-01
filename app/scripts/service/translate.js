'use strict';

module.exports = function(value) {
  var result = chrome.i18n.getMessage(value);

  if(result === '') {
    console.error('untranslated key: ' + value);
  }
  
  return result;
};
