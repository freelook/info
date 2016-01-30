'use strict';

angular
  .module('fli.search')
  .controller('search.result.promo.ctrl',
  function ($timeout, promo, user, toast, SHOW) {

    var vm = this;
    vm.results = [];

    vm.click = function (_item) {
      if (user.current()) {
        promo.click(_item);
      } else {
        toast.needLogin();
      }
    };

    SHOW.query()
      .then(function (results) {
        $timeout(function () {
          vm.results = results || [];
        });
      });

  });

