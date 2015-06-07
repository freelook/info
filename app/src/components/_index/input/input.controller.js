'use strict';
angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($rootScope, $scope, $timeout, $mdBottomSheet, $location, CONFIG, DEFAULT_PLACEHOLDER) {

    $scope.placeholder = DEFAULT_PLACEHOLDER;
    $rootScope.fli.focus = 0;
    $scope.fli = $rootScope.fli;

    $scope.find = function () {
      if ($scope.fli.route.input) {
        if ($location.path() === '/search') {
          $rootScope.go({input: $scope.fli.route.input});
        } else {
          $rootScope.go('search?input=' + $scope.fli.route.input);
        }
      }
    };

    $scope.clear = function () {
      $scope.fli.route.input = '';
    };

    $scope.href = function () {
      if ($scope.fli.route.input) {
        var href = CONFIG.ORIGIN + 'search?input=' + $scope.fli.route.input;
        if ($scope.fli.route.type) {
          href += '&type=' + $scope.fli.route.type;
        }
        return href;
      }
      return '/';
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
