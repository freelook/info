'use strict';
angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $mdBottomSheet, DEFAULT_PLACEHOLDER) {

    $scope.items = [];
    $scope.icon = 'bars';
    $scope.placeholder = DEFAULT_PLACEHOLDER;

    $scope.find = function () {
      if($scope.fli.route.input) {
        $scope.go('search?input=' + $scope.fli.route.input);
      } else {
        $scope.go('/');
      }
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

  })
  .constant('DEFAULT_PLACEHOLDER', 'Type what you want');
