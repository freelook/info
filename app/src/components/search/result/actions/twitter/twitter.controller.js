'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.actions.twitter.ctrl',
  function ($scope, $parse, twitter) {

    var vm = this;
    vm.link = twitter.link;
    vm.search = [];

    function setResult(search) {
      console.log(search);
      vm.search = $parse('statuses')(search) || [];
    }

    if ($scope.fli.route.input) {
      twitter.search($scope.fli.route.input).success(setResult);
    }

  });

