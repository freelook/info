'use strict';
angular
  .module('fli.look')
  .controller('look.suggest.ctrl',
  function ($scope, url, google, item) {

    var vm = this;
    vm.search = {};
    vm.href = item.href;

    function setResult(search) {
      vm.search = search || {};
    }

    if ($scope.site.host) {
      if ($scope.fli.route.input) {
        google.web('site:' + $scope.site.host + ' ' + $scope.fli.route.input).success(setResult);
      } else {
        google.web('related:' + $scope.site.host).success(setResult);
      }
    }

  });
