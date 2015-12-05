'use strict';

angular
  .module('fli.search')
  .controller('search.result.video.google.ctrl',
  function ($scope, $parse, item, youtube) {

    var vm = this;
    vm.href = item.href;
    vm.share = item.share;
    vm.watchUrl = youtube.watchUrl;

    vm.items = [];

    function setResult(res) {
      vm.items = $parse('items')(res) || [];
    }

    youtube.search($scope.fli.route.input || '')
      .success(setResult);

  });

