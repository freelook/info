'use strict';
angular
  .module('fli.search')
  .controller('search.sub.ctrl',
  function ($scope, url, locale) {

    var vm = this;

    vm.href = function (sub) {
      return url.href('search?', {
        l: locale.getCode(),
        input: $scope.fli.route.input || '',
        type: $scope.fli.route.type || null,
        sub: sub
      });
    };

  });
