'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $sce, api, read, full) {

    $scope.html = '';

    function setContent(_content) {
      var content = _content || {};
      if (content.html) {
        $scope.html = full.get(content.html) || '';
      } else if (content.content) {
        $scope.html = full.get(content.content, content.title) || '';
      }
    }

    if ($rootScope.fli.route.url) {
      api.get($rootScope.fli.route.url)
        .success(setContent)
        .error(function () {
          read.call($rootScope.fli.route.url)
            .success(setContent);
        });
    }

  });


