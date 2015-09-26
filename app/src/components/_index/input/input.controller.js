'use strict';

angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $location, url, locale, PLACEHOLDER) {

    var vm = this;
    vm.placeholder = PLACEHOLDER;
    vm.icon = $scope.fli.icon;
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
        vm.icon = $scope.fli.icon;
        return url.href($location.url().slice(1));
      }
      if ($scope.fli.route.input) {
        vm.icon = 'search';
        return url.href('search?', {l: locale.getCode(), input: $scope.fli.route.input}, true);
      }
      vm.icon = 'th-large';
      return '/';
    };

    vm.setting = function () {
      $scope.fli.view = 'components/_index/core/uix/setting/setting.view.html';
    };

    vm.focus = function () {
      $scope.fli.focus = 1;
    };

  })
  .constant('PLACEHOLDER', 'index.input.placeholder');
