'use strict';

angular
  .module('fli.search')
  .controller('search.result.promo.ctrl',
  function ($timeout, promo, user, toast, PROMO) {

    var vm = this;
    vm.results = {};

    vm.click = function ($key) {
      if (user.authData().uid) {
        promo.click($key);
      } else {
        toast.needLogin();
      }
    };

    PROMO.query()
      .then(function (results) {
        $timeout(function () {
          vm.results = results.val() || {};
        });
      });

  });

