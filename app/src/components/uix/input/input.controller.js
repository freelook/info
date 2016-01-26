'use strict';

angular
  .module('fli.uix')
  .controller('input.ctrl',
  function ($scope, url, locale, nav, PLACEHOLDER) {

    var vm = this, _search_ = 'search';
    $scope.fli.focus = 0;

    vm.placeholder = PLACEHOLDER;
    vm.type = _search_;
    vm.icon = _search_;
    vm.action = _search_;
    vm.input = $scope.fli.route.input;

    function _route() {
      return {
        l: locale.getCode(),
        input: vm.input,
        type: $scope.fli.route.type,
        sub: $scope.fli.route.sub
      };
    }

    vm.find = function () {
      $scope.go(url.href('?', _route(), false, '/'));
    };

    vm.clear = function () {
      vm.input = null;
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
      $scope.fli.view = 'components/views/setting/setting.view.html';
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
