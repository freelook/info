'use strict';
angular
  .module('fli.search')
  .controller('search.lucky.ctrl',
  function ($scope, lucky) {

    var vm = this;

    vm.go = function () {
      lucky.get().then(function (_lucky) {
        $scope.go(_lucky.href);
      });
    };

  });
