'use strict';

angular
  .module('fli.search')
  .controller('search.result.job.linkedin.ctrl',
  function ($scope, linkedin) {

    var vm = this;

    function setResult(jobs) {
      vm.jobs = jobs || [];
    }

    linkedin
      .jobs($scope.fli.route.input || '')
      .then(setResult);

  });

