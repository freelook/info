'use strict';

angular
  .module('fli.search')
  .controller('search.result.feeds.ctrl',
  function ($timeout, $scope, FEEDS) {

    var vm = this;
    vm.results = [];

    FEEDS.query($scope.fli.route.input)
      .success(function (results) {
        vm.results = results || [];
      });

  });

