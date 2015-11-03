'use strict';

angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $location, url, locale, facebook, auth, PLACEHOLDER) {

    var vm = this;
    $scope.fli.focus = 0;

    vm.placeholder = PLACEHOLDER;
    vm.type = 'search';
    vm.icon = $scope.fli.icon;
    vm.fbImg = facebook.img;


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
      if ($scope.fli.focus && $scope.fli.route.input) {
        vm.icon = 'search';
        return url.href('search?', {l: locale.getCode(), input: $scope.fli.route.input, type: $scope.fli.route.type});
      }
      vm.icon = $scope.fli.icon;
      return url.href($location.url().slice(1));
    };

    vm.setting = function () {
      $scope.fli.view = 'components/_index/core/uix/setting/setting.view.html';
      auth.logIn();
    };

    vm.focus = function () {
      $scope.fli.focus = 1;
    };

  })
  .constant('PLACEHOLDER', 'index.input.placeholder');
