'use strict';

angular
  .module('fli.promo')
  .controller('promo.kickstarter.ctrl', function (storage) {

    var vm = this;
    vm.isVisible = storage.get(storage.keys.KICKSTARTER_PROMO_VISIBILITY_KEY, true);

    vm.toggle = function (isVisible) {
      vm.isVisible = !!isVisible;
      storage.set(storage.keys.KICKSTARTER_PROMO_VISIBILITY_KEY, vm.isVisible);
    };

  });
