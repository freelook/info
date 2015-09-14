'use strict';
angular.module('fli.look')
  .directive('webViewHeight', function ($window, $document) {
    return function (scope, webview) {
      function updateWebview() {
        $(webview).height($document[0].documentElement.clientHeight - 60);
      }

      $(webview).on('loadstart', updateWebview);
      $(webview).on('loadstop', updateWebview);
      $($window).on('resize', updateWebview);

    };
  });
