'use strict';

angular
  .module('fli.look')
  .controller('look.content.rich.ctrl',
  function ($rootScope, $scope, yandex) {

    $scope.rich = {};

    if ($rootScope.fli.route.url) {
      yandex.rich(decodeURIComponent($rootScope.fli.route.url))
        .success(function (rich) {
          $scope.rich = rich || {};
        });
    }

  });


