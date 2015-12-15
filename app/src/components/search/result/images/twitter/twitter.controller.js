'use strict';

angular
  .module('fli.search')
  .controller('search.result.web.images.twitter.ctrl',
  function ($scope, $parse, twitter) {

    var vm = this;
    vm.link = twitter.link;
    vm.search = [];

    function setResult(search) {
      console.log(search);
      vm.search = $parse('statuses')(search) || [];
    }

    if ($scope.fli.route.input) {
      twitter.images($scope.fli.route.input).success(setResult);
    }

  });

