'use strict';

angular
  .module('fli.uix')
  .controller('input.ctrl',
  function ($routeParams, $scope, index, url, locale, nav, setting, user, PLACEHOLDER) {

    var vm = this, _filter_ = 'filter';
    $scope.fli.focus = 0;

    vm.placeholder = PLACEHOLDER;
    vm.type = _filter_;
    vm.icon = _filter_;
    vm.action = _filter_;

    function _route() {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input || null,
        type: $scope.fli.route.type || null,
        sub: $scope.fli.route.sub || null
      };
    }

    vm.img = user.img;

    vm.active = function () {
      return $scope.fli.focus || $scope.fli.view;
    };

    vm.find = function () {
      $scope.go(url.href('?', _route(), false, '/'));
    };

    vm.clear = function () {
      $scope.fli.route.input = null;
      vm.blur();
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

    vm.isSetting = function () {
      return !setting.isOpen() && user.params.isLocal();
    };

    vm.setting = function () {
      setting.open();
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
