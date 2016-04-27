'use strict';

angular
  .module('fli.promo')
  .controller('promo.amazon.ctrl',
  function ($window, $routeParams, $timeout, CONFIG) {

    var vm = this, eventName = 'message', bubble = false;

    vm.url = [CONFIG.SITE.ORIGIN, 'vendors/amazon/amazon.html?query=', $routeParams.input || ''].join('');

    $window.addEventListener(eventName, function receiveMessage(msg) {
      $window.removeEventListener(eventName, receiveMessage, bubble);
      if (msg && msg.data === 'amazon') {
        $timeout(function () {
          vm.ready = true;
        });
      }
    }, bubble);

  });
