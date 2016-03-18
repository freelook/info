'use strict';

angular
  .module('fli.search')
  .controller('search.result.promo.ctrl',
  function ($timeout, promo, user, toast, nav, PROMO) {

    var vm = this;
    vm.results = {};

    vm.click = function ($key) {
      if (user.authData().uid) {
        promo.click($key);
      } else {
        toast.needLogin();
      }
    };

    vm.add = function () {
      nav.go('show');
    };

    PROMO.query()
      .then(function (results) {
        $timeout(function () {
          vm.results = results.val() || {};
        });
      });

  });

