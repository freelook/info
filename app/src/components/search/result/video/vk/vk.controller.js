'use strict';

angular
  .module('fli.search')
  .controller('search.result.video.vk.ctrl',
  function ($scope, vk, lucky) {

    var vm = this;

    function setResult(vk) {
      vm.results = vk.response || [];
    }

    vk.video($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

