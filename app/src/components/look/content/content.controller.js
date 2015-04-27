'use strict';

angular
  .module('fli.look')
  .controller('look.content.ctrl',
  function ($rootScope, $scope, $sce, boilerpipe, read, full) {

    $scope.html = '';
    $scope.images = [];

    function setContent(content) {
      if (content) {
        if (content.html || content.images) {
          $scope.html = full.get(content.html) || '';
          $scope.images = content.images || [];
        } else if (content.content) {
          $scope.html = full.get(content.content) || '';
        }
      }
    }

    if ($rootScope.fli.route.url) {
      boilerpipe.get($rootScope.fli.route.url)
        .success(setContent)
        .error(function () {
          read.get($rootScope.fli.route.url).success(setContent);
        });
    }

  });


