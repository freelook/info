'use strict';

angular
  .module('fli.search')
  .controller('search.result.video.vk.ctrl',
  function ($scope, $sce, url, vk) {

    var vm = this;

    function setResult(vk) {
      vm.results = vk.response || [];
    }

    if ($scope.fli.route.input) {
      vk.video($scope.fli.route.input)
        .success(setResult);
    }

  });

