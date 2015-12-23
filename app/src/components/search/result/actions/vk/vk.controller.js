'use strict';

angular
  .module('fli.search')
  .controller('search.result.actions.vk.ctrl',
  function ($scope, $sce, url, vk) {

    var vm = this;

    vm.link = vk.link;

    function setResult(vk) {
      var result = vk.response || [];
      vm.actions = angular.copy(result).splice(1);
    }

    vk.actions($scope.fli.route.input || '')
      .success(setResult);

  });

