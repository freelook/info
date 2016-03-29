'use strict';

angular
  .module('fli.uix')
  .controller('input.ctrl',
  function ($scope, index, url, locale, nav, setting, PLACEHOLDER) {

    var vm = this, _search_ = 'search';
    $scope.fli.focus = 0;

    vm.placeholder = PLACEHOLDER;
    vm.type = _search_;
    vm.icon = _search_;
    vm.action = _search_;

    function _route() {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input || null,
        type: $scope.fli.route.type || null,
        sub: $scope.fli.route.sub || null
      };
    }

    vm.find = function () {
      $scope.go(url.href('?', _route(), false, '/'));
    };

    vm.clear = function () {
      $scope.fli.route.input = null;
    };

    vm.close = function () {
      $scope.fli.view = '';
      index.reload();
    };

    vm.blur = function () {
      $scope.fli.focus = 0;
    };

    vm.focus = function () {
      $scope.fli.focus = 1;
    };

    vm.setting = function () {
      setting.open();
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
