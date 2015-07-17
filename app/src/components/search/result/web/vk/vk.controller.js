'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.vk.ctrl',
  function ($scope, $sce, url, vk) {

    var vm = this;
    vm.search = {};

    vm.link = function (_id) {
      var id = _id || '';
      return 'https://vk.com/' + id;
    };

    function setResult(vk) {
      var result = vk.response || [];
      vm.results = angular.copy(result).splice(1);
    }

    if ($scope.fli.route.input) {
      vk.pages($scope.fli.route.input)
        .success(setResult);
    }

  });

