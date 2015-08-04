'use strict';

angular
  .module('fli.home')
  .controller('home.widget.trends.ctrl',
  function (hotTrends, result) {

    var vm = this;
    vm.items = [];
    vm.share = result.share;

    hotTrends()
      .then(function (items) {
        vm.items = items || [];
      });

  });

