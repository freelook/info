'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.ctrl',
  function ($scope, $translate, $location, chips, url, locale) {

    var vm = this;
    vm.types = chips.types;

    function _init() {
      var type = $scope.fli.route.type;
      if ($scope.chips && type) {
        $scope.chips.items.push({
          name: $translate.instant(!!chips.subs[type] ? ['search.tabs', type].join('.') : type),
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
      return url.href('?', _config(type), false, '/');
    };

    vm.go = function (type) {
      $scope.go(vm.href(type));
    };

    _init();

  });
