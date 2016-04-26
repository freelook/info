'use strict';

angular
  .module('fli.promo')
  .factory('promo',
  function (FB) {

    function init() {
      FB.promo();
    }

    return {
      init: init
    };

  });
