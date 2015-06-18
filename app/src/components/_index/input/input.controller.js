'use strict';
angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $timeout, $mdBottomSheet, $location, CONFIG, DEFAULT_PLACEHOLDER) {

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
      if ($scope.fli.route.input) {
        var href = CONFIG.ORIGIN + 'search?input=' + $scope.fli.route.input;
        if ($scope.fli.route.type) {
          href += '&type=' + $scope.fli.route.type;
        }
        return href;
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
