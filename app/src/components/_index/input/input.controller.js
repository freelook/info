'use strict';

angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $rootScope, $location, url, locale, PLACEHOLDER) {

    var vm = this;
    vm.placeholder = PLACEHOLDER;
    vm.icon = $scope.fli.icon;
    $scope.fli.focus = 0;

    vm.find = function () {
      if ($scope.fli.route.input) {
        $scope.go(url.href('search?', {
          l: locale.getCode(),
          input: $scope.fli.route.input || '',
          type: $scope.fli.route.type || 'web'
        }, false, '/'));
      }
    };

    vm.clear = function ($event) {
      $scope.fli.route.input = '';
      $event.stopPropagation();
    };

    vm.href = function () {
      if (!$scope.fli.focus) {
        vm.icon = $scope.fli.icon;
        return url.href($location.url().slice(1));
      }
      if ($scope.fli.route.input) {
        vm.icon = 'search';
        return url.href('search?', {l: locale.getCode(), input: $scope.fli.route.input, type: $scope.fli.route.type});
      }
      vm.icon = 'eye-slash';
      return '/';
    };

    vm.setting = function () {
      $scope.fli.view = !$scope.fli.view ? 'components/_index/core/uix/setting/setting.view.html' : '';
    };

    vm.focus = function () {
      $scope.fli.focus = 1;
    };

  })
  .constant('PLACEHOLDER', 'index.input.placeholder');
