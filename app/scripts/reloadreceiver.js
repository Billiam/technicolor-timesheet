'use strict';

chrome.runtime.connect().onMessage.addListener(function(msg) {
  if (msg.reload) {
    setTimeout(function() {
      location.reload(false);
    }, 200);
  }
});