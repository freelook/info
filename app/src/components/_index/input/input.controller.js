'use strict';

angular
  .module('freelook.info')
  .controller('input.ctrl',
  function ($scope, $location, url, locale, facebook, auth, content, PLACEHOLDER) {

    var vm = this;
    $scope.fli.focus = 0;

    vm.placeholder = PLACEHOLDER;
    vm.type = 'search';
    vm.icon = 'search';
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
      return url.href('?', {l: locale.getCode()});
    };

    vm.find = function () {
      if ($scope.fli.route.input) {
        $scope.go(url.href('search?', _route(), false, '/'));
      }
    };

    vm.href = function () {
      return url.href('search?', _route());
    };

    vm.clear = function ($event) {
      $scope.fli.route.input = '';
      $event.stopPropagation();
    };

    vm.setting = function () {
      auth.logIn();
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
