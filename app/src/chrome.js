'use strict';

window.chrome.app.runtime.onLaunched.addListener(function (params) {
  window.params = params;
  window.chrome.app.window.create('app.html', {
    state: 'maximized'
  });
});

window.chrome.runtime.onMessage.addListener(function (req, sender, res) {
  res(req);
});

window.chrome.runtime.onMessageExternal.addListener(function (req, sender, res) {
  window.chrome.runtime.sendMessage(req);
  res(req);
});

window.chrome.contextMenus.create({
  title: "FLI",
  type: "normal",
  contexts: ["all"],
  id: "1"
});
