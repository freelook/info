'use strict';

angular
  .module('fli.look')
  .controller('look.iframe.ctrl',
  function ($scope, $parse, api, iframe) {

    function setter(_html) {
      var html = iframe.get(_html) || '';
      if (html) {
        if ($parse('contentDocument.documentElement.innerHTML')($scope.iframeEl)) {
          $scope.iframeEl.contentDocument.documentElement.innerHTML = html;
        }
      }
    }

    if ($scope.fli.route.url) {
      api.proxy($scope.fli.route.url)
        .success(setter);
    }

  });


