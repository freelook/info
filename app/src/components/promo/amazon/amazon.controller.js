'use strict';

angular
  .module('fli.promo')
  .controller('promo.amazon.ctrl',
  function ($routeParams, CONFIG) {

    var vm = this;
    vm.url = [CONFIG.SITE.ORIGIN, 'vendors/amazon/amazon.html?query=', $routeParams.input || ''].join('');

  });
