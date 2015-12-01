'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.google.ctrl',
  function ($scope, google) {

    var vm = this;
    vm.people = {};

    function setResult(people) {
      vm.people = people || {};
    }

    if ($scope.fli.route.input) {
      google.plus.people($scope.fli.route.input)
        .success(setResult);
    }

  });

