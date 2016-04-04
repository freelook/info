'use strict';

angular
  .module('fli.search')
  .controller('search.result.rss.ctrl',
  function ($scope, $parse, google) {

    var vm = this;
    vm.entries = [];

    function setResult(results) {
      vm.entries = $parse('responseData.feed.entries')(results) || [];
    }

    if ($scope.fli.route.sub) {
      google.feeds($scope.fli.route.sub).success(setResult);
    }

  });

