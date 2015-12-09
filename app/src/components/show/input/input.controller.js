'use strict';

angular
  .module('fli.show')
  .controller('show.input.ctrl',
  function ($scope, url, locale) {

    var vm = this;
    vm.placeholder = 'show.input.placeholder';
    vm.type = 'url';
    vm.icon = 'plus';
    vm.action = 'add';

    function _route() {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input ? encodeURIComponent(decodeURIComponent($scope.fli.route.input)) : ''
      };
    }

    vm.find = function () {
      if ($scope.fli.route.input) {
        $scope.go(url.href('show?', _route(), false, '/'));
      }
    };

    vm.href = function () {
      return url.href('show?', _route());
    };

  });

