'use strict';

angular
  .module('fli.search')
  .controller('search.result.promo.ctrl',
  function ($timeout, promo, SHOW) {

    var vm = this;
    vm.results = [];

    vm.click = function (_item) {
      promo.click(_item);
    };

    SHOW.query()
      .limit(24)
      .find()
      .then(function (results) {
        $timeout(function () {
          vm.results = results || [];
        });
      });

  });

