'use strict';
angular
  .module('fli.search')
  .controller('search.sub.ctrl',
  function ($scope, url) {

    var vm = this;

    vm.href = function (sub) {
      return url.href('search?', {
        input: $scope.fli.route.input || '',
        type: $scope.fli.route.type || null,
        sub: sub
      });
    };

  });
