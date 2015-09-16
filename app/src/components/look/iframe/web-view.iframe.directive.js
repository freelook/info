'use strict';
angular.module('fli.look')
  .directive('webView', function ($window, $document) {
    return function (scope, webview) {

      function updateWebview() {
        $(webview).height($document[0].documentElement.clientHeight - 60);
      }

      $(webview).on('loadstop', updateWebview);
      $($window).on('resize', updateWebview);

    };
  });
