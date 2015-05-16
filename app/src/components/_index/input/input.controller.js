'use strict';
angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($rootScope, $scope, $timeout, $mdBottomSheet, DEFAULT_PLACEHOLDER) {

    $scope.placeholder = DEFAULT_PLACEHOLDER;
    $rootScope.fli.focus = 0;
    $scope.fli = $rootScope.fli;

    $scope.find = function () {
      if ($scope.fli.route.input) {
        $rootScope.go('search?input=' + $scope.fli.route.input);
      }
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

    $scope.href = function (_href) {
      if ($scope.fli.route.input) {
        return 'search?input=' + $scope.fli.route.input;
      }
      return _href;
    };

    $scope.focus = function () {
      $rootScope.fli.focus = 1;
    };

    $scope.blur = function () {
      $timeout(function () {
        $rootScope.fli.focus = 0;
      }, 333);
    };

  })
  .constant('DEFAULT_PLACEHOLDER', 'Type what you need');
