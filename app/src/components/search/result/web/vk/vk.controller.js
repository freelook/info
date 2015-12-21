'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.vk.ctrl',
  function ($scope, vk) {

    var vm = this;

    vm.link = vk.link;

    function setResult(vk) {
      var result = vk.response || [];
      vm.results = angular.copy(result).splice(1);
    }

    if ($scope.fli.route.input) {
      vk.pages($scope.fli.route.input)
        .success(setResult);
    }

  });

