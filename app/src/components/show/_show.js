(function () {
  'use strict';

  window.i18n.ru.show = {};
  window.i18n.en.show = {};

  angular
    .module('fli.show', [])
    .config(function ($routeProvider) {
      // Routes config
      $routeProvider
        .when('/show/:id?', {
          templateUrl: 'components/show/show.html',
          controller: 'show.ctrl'
        });
    });

}());
