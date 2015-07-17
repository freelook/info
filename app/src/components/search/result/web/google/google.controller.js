'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.google.ctrl',
  function ($scope, CONFIG, google) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = search || {};
    }

    if ($scope.fli.route.input) {
      google.web($scope.fli.route.input).success(setResult);
    }

  });

