'use strict';

angular
  .module('fli.search')
  .controller('search.result.feeds.ctrl',
  function ($timeout, FEEDS) {

    var vm = this;
    vm.results = {};

    FEEDS.query()
      .then(function (results) {
        $timeout(function () {
          vm.results = results.val() || {};
        });
      });

  });

