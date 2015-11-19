'use strict';

angular
  .module('fli.search')
  .controller('search.result.promo.ctrl',
  function ($timeout, SHOW) {

    var vm = this;
    vm.results = [];

    vm.click = function (_item) {
      console.log('+ ' + _item.get('price'));
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

