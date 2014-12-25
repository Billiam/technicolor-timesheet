'use strict';

function once() {
  chrome.storage.sync.set({ installVersion: 0});
  chrome.storage.sync.set(
    {
      rules: [
        {
          color: '#ceffcc',
          ruleType: 'all',
          conditions: [
            {
              column: 'workorder',
              regex: false,
              value: 'ADMIN'
            },
            {
              column: 'client',
              regex: false,
              value: 'SIERRA'
            }
          ]
        }
      ]
    }
  );
}

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason === 'install') {
    chrome.storage.sync.get('installVersion', function(data) {
      if (data.installVersion == null) {
        once();
      }
    });
  }
});