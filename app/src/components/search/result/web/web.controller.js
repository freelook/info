'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.ctrl',
  function ($scope, CONFIG, google, yandex) {

    var vm = this;
    vm.search = {};

    function setResult(search) {
      vm.search = search || {};
    }

    if ($scope.fli.route.input) {
      google.web($scope.fli.route.input)
        .success(setResult)
        .error(function () {
          yandex.search($scope.fli.route.input)
            .then(setResult);
        });
    }

  });

