'use strict';

window.chrome.app.runtime.onLaunched.addListener(function () {
  window.chrome.app.window.create('app.html', {
    state: 'maximized'
  });
});

window.chrome.runtime.onMessageExternal.addListener(
  function (req, sender, res) {
    res({do: req.do + '+'});
  });
