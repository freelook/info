'use strict';

angular
  .module('fli.show')
  .controller('show.item.ctrl',
  function ($scope, content) {

    if ($scope.fli.route.input) {
      $scope.site = content.site($scope.fli.route.input);
    }

  });

