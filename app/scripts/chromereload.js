'use strict';

// Reload client for Chrome Apps & Extensions.
// The reload client has a compatibility with livereload.
// WARNING: only supports reload command.

var LIVERELOAD_HOST = 'localhost:';
var LIVERELOAD_PORT = 35729;
var connection = new WebSocket('ws://' + LIVERELOAD_HOST + LIVERELOAD_PORT + '/livereload');

connection.onerror = function (error) {
  console.log('reload connection got error' + JSON.stringify(error));
};

var connections = [];

chrome.runtime.onConnect.addListener(function(port) {
  connections.push(port);
  port.onDisconnect.addListener(function(port) {
    var idx = connections.indexOf(port);
    if (idx !== -1) {
      connections.splice(idx, 1);
    }
  });
});

connection.onmessage = function (e) {
  if (e.data) {
    var data = JSON.parse(e.data);
    if (data && data.command === 'reload') {
      connections.forEach(function(port) {
        port.postMessage({reload: true});
      });
      chrome.runtime.reload();
    }
  }
};
