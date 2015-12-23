'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.vk.ctrl',
  function ($scope, vk, lucky) {

    var vm = this;

    vm.link = vk.link;

    function setResult(vk) {
      var result = vk.response || [];
      vm.results = angular.copy(result).splice(1);
    }

    vk.pages($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

