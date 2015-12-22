'use strict';

angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, url, locale, nav, PLACEHOLDER) {

    var vm = this, _search_ = 'search';
    $scope.fli.focus = 0;

    vm.placeholder = PLACEHOLDER;
    vm.type = _search_;
    vm.icon = _search_;
    vm.action = _search_;

    function _route() {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input || '',
        type: $scope.fli.route.type,
        sub: $scope.fli.route.sub
      };
    }

    vm.find = function () {
      if ($scope.fli.route.input) {
        $scope.go(url.href('?', _route(), false, '/'));
      }
    };

    vm.clear = function () {
      $scope.fli.route.input = '';
      vm.blur();
    };

    vm.close = function () {
      $scope.fli.view = '';
    };

    vm.blur = function () {
      $scope.fli.focus = 0;
    };

    vm.focus = function () {
      $scope.fli.focus = 1;
    };

    vm.setting = function () {
      $scope.fli.view = 'components/_index/setting/setting.view.html';
    };

    vm.filter = function () {
      $scope.fli.filter = 1;
    };

    vm.home = function () {
      if ($scope.fli.focus) {
        vm.blur();
      } else if ($scope.fli.view) {
        vm.close();
      } else {
        nav.goHome();
      }
    };

  })
  .constant('PLACEHOLDER', 'index.input.placeholder');
