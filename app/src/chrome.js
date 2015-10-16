'use strict';

window.chrome.app.runtime.onLaunched.addListener(function (params) {
  window.params = params;
  window.chrome.app.window.create('app.html', {
    state: 'maximized'
  });
});

window.chrome.runtime.onMessageExternal.addListener(
  function (req, sender, res) {
    res({do: req.do + '+'});
  });

window.chrome.contextMenus.create({
  title: "FLI",
  type: "normal",
  contexts: ["all"],
  id: "1"
});
