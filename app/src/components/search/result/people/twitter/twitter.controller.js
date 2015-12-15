'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.people.twitter.ctrl',
  function ($scope, twitter) {

    var vm = this;
    vm.link = twitter.link;
    vm.search = [];

    function setResult(search) {
      vm.search = search || [];
    }

    if ($scope.fli.route.input) {
      twitter.people($scope.fli.route.input).success(setResult);
    }

  });

