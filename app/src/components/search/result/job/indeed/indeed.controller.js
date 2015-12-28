'use strict';

angular
  .module('fli.search')
  .controller('search.result.job.indeed.ctrl',
  function ($scope, indeed, lucky) {

    var vm = this;

    indeed
      .search($scope.fli.route.input || lucky.word)
      .then(function (res) {
        vm.results = res;
      });

  });

