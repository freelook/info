'use strict';

angular
  .module('fli.look')
  .controller('look.content.youtube.watch.ctrl',
  function ($rootScope, $scope, youtube) {

    $scope.watch = function () {
      return youtube.watch($rootScope.fli.route.url);
    };

  });



