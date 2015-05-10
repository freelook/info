'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $sce, api, read, full) {

    $scope.html = '';
    $scope.images = [];

    function setContent(content) {
      if (content) {
        if (content.html) {
          $scope.html = full.get(content.html) || '';
        } else if (content.content) {
          $scope.html = full.link(content.content) || '';
        }
      }
    }

    if ($rootScope.fli.route.url) {
      api.get(decodeURIComponent($rootScope.fli.route.url))
        .success(setContent)
        .error(function () {
          read.call($rootScope.fli.route.url)
            .success(setContent);
        });
    }

  });


