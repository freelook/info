'use strict';

angular
  .module('fli.home')
  .controller('home.widget.trends.ctrl',
  function (hotTrends, item) {

    var vm = this;
    vm.items = [];
    vm.share = item.share;

    hotTrends()
      .then(function (items) {
        vm.items = items || [];
      });

  });

