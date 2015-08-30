'use strict';

angular
  .module('fli.search')
  .controller('search.result.video.google.ctrl',
  function ($scope, $parse, item, google) {

    var vm = this;
    vm.href = item.href;
    vm.share = item.share;
    vm.items = [];

    function setResult(res) {
      vm.items = $parse('responseData.results')(res) || [];
    }

    google.video($scope.fli.route.input || '')
      .success(setResult);

  });

