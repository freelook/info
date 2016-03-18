'use strict';
angular
  .module('fli.search')
  .controller('search.chips.type.sub.ctrl',
  function ($scope, url, chips, locale) {

    var vm = this;

    vm.subs = chips.subs;

    function _init() {
      if ($scope.chips && $scope.fli.route.sub) {
        $scope.chips.items.push({
          name: $scope.fli.route.sub,
          key: 'sub',
          route: url.href(null, _config(null), false, '/')
        });
      }
    }

    function _config(sub) {
      return {
        l: locale.getCode(),
        input: $scope.fli.route.input,
        type: $scope.fli.route.type,
        sub: sub
      };
    }

    vm.href = function (sub) {
      return url.href(null, _config(sub));
    };

    vm.go = function (sub) {
      $scope.go(_config(sub));
    };

    _init();

  });
