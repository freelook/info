'use strict';

angular
  .module('fli.home')
  .controller('home.widget.trends.ctrl',
  function (hotTrends) {

    var vm = this;
    vm.items = [];

    hotTrends()
      .then(function (items) {
        vm.items = items || [];
      });

  });

