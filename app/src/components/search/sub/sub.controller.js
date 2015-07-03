'use strict';
angular
  .module('fli.search')
  .controller('search.sub.ctrl',
  function ($scope, CONFIG) {

    var vm = this;

    vm.href = function (sub) {
      var href = CONFIG.ORIGIN + 'search?input=' + $scope.fli.route.input;
      if ($scope.fli.route.type) {
        href += '&type=' + $scope.fli.route.type;
      }
      if (sub) {
        href += '&sub=' + sub;
      }
      return href;
    };

  });
