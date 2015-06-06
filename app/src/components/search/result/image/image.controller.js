'use strict';

angular
  .module('fli.search')
  .controller('search.result.image.ctrl',
  function ($scope, CONFIG, google) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = search || {};
    }

    if ($scope.fli.route.input) {
      google.image($scope.fli.route.input)
        .success(setResult);
    }

  });

