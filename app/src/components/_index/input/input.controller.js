'use strict';

angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $location, url, locale, facebook, content, nav, PLACEHOLDER) {

    var vm = this;
    $scope.fli.focus = 0;

    vm.placeholder = PLACEHOLDER;
    vm.type = 'search';
    vm.icon = 'search';
    vm.action = 'search';
    vm.fbImg = facebook.img;
    vm.site = content.site($scope.fli.route.url);

    function _route() {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input || '',
        type: $scope.fli.route.type,
        sub: $scope.fli.route.sub
      };
    }

    vm.home = function () {
      vm.close();
      nav.goHome();
    };

    vm.find = function () {
      if ($scope.fli.route.input) {
        $scope.go(url.href('search?', _route(), false, '/'));
      }
    };

    vm.href = function () {
      return url.href('search?', _route());
    };

    vm.clear = function () {
      $scope.fli.route.input = '';
    };

    vm.close = function () {
      $scope.fli.view = '';
      $scope.fli.focus = 0;
    };

    vm.setting = function () {
      $scope.fli.view = 'components/_index/setting/setting.view.html';
    };

    vm.focus = function () {
      $scope.fli.focus = 1;
    };

    vm.filter = function ($event) {
      $scope.fli.filter = !$scope.fli.filter;
      $event.stopPropagation();
    };

  })
  .constant('PLACEHOLDER', 'index.input.placeholder');
