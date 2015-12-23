'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.vk.ctrl',
  function ($scope, $sce, url, vk) {

    var vm = this;

    vm.link = vk.link;

    function setResult(vk) {
      var result = vk.response || [];
      vm.people = angular.copy(result).splice(1);
    }

    vk.people($scope.fli.route.input || '')
      .success(setResult);

  });

