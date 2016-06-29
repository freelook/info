(function () {
  'use strict';

  window.i18n.ru.search = {};
  window.i18n.en.search = {};

  angular
    .module('fli.search', [])
    .run(function (promo) {
      promo.init();
    })
    .constant('BLACK_LIST', [
      'www.starstatements.com'
    ].join('|'));

}());
