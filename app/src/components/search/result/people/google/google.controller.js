'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.google.ctrl',
  function ($scope, google, lucky) {

    var vm = this;
    vm.people = {};

    function setResult(people) {
      vm.people = people || {};
    }

    google.plus.people($scope.fli.route.input || lucky.word)
      .success(setResult);

  });

