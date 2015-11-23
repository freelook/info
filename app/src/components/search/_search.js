(function () {
  'use strict';

  window.i18n.ru.search = {};
  window.i18n.en.search = {};

  angular
    .module('fli.search', [])
    .config(function ($routeProvider) {

      // Routes config
      $routeProvider
        .when('/search', {
          templateUrl: 'components/search/search.html',
          controller: 'search.ctrl'
        });

    })
    .run(function (promo) {
      promo.init();
    });

}());
