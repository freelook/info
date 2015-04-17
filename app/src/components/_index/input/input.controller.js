'use strict';
angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($rootScope, $scope, $mdBottomSheet, DEFAULT_PLACEHOLDER) {

    $scope.items = [];
    $scope.placeholder = DEFAULT_PLACEHOLDER;
    $scope.fli = $rootScope.fli;

    $scope.find = function () {
      if ($scope.fli.route.input) {
        $rootScope.go('search?input=' + $scope.fli.route.input);
      }
    };

    $scope.clear = function () {
      $rootScope.fli.route.input = '';
    };

    $scope.action = function (_do) {
      if (_do && typeof _do === 'function' && !$scope.fli.route.input) {
        _do();
      }
    };

  })
  .constant('DEFAULT_PLACEHOLDER', 'Type what you need');
