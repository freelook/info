'use strict';
angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $timeout, $mdBottomSheet, $location, url, DEFAULT_PLACEHOLDER) {

    var vm = this;
    vm.placeholder = DEFAULT_PLACEHOLDER;
    $scope.fli.focus = 0;

    vm.find = function () {
      if ($scope.fli.route.input) {
        if ($location.path() === '/search') {
          $scope.go({input: $scope.fli.route.input});
        } else {
          $scope.go('search?input=' + $scope.fli.route.input);
        }
      }
    };

    vm.clear = function () {
      $scope.fli.route.input = '';
    };

    vm.href = function () {
      if (!$scope.fli.focus) {
        return url.href($location.url().slice(1));
      }
      if ($scope.fli.route.input) {
        return url.href('search?', {input: $scope.fli.route.input}, true);
      }
      return '/';
    };

    vm.focus = function () {
      $scope.fli.focus = 1;
    };

    vm.blur = function () {
      $timeout(function () {
        $scope.fli.focus = 0;
      }, 333);
    };

  })
  .constant('DEFAULT_PLACEHOLDER', 'Type what you need');
