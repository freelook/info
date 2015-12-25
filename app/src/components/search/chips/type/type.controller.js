'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.ctrl',
  function ($scope, $translate, chips, url, locale) {

    var vm = this;
    vm.types = chips.types;

    function _init() {
      if ($scope.chips && $scope.fli.route.type) {
        $scope.chips.items.push({
          name: $translate.instant('search.tabs.' + $scope.fli.route.type),
          key: 'type',
          route: url.href('?', _config(null), false, '/')
        });
      }
    }

    function _config(type) {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input,
        type: type
      };
    }

    vm.href = function (type) {
      return url.href('?', _config(type));
    };

    vm.go = function (type) {
      $scope.go(_config(type));
    };

    _init();

  });
