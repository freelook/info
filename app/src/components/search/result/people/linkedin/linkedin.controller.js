'use strict';

angular
  .module('fli.search')
  .controller('search.result.people.linkedin.ctrl',
  function ($scope, linkedin, lucky) {

    var vm = this;

    function setResult(people) {
      vm.people = people || [];
    }

    linkedin
      .people($scope.fli.route.input || lucky.word)
      .then(setResult);

  });

