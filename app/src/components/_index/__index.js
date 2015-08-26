(function () {
  'use strict';

  window.i18n = {
    en: {},
    ru: {}
  };

  angular
    .module('freelook.info',
    ['ngAnimate', 'ngTouch', 'ngSanitize', 'ngRoute', 'ngMaterial', 'pascalprecht.translate', 'mediaPlayer',
      'fli.home', 'fli.search', 'fli.look', 'fli.company', 'fli.todo'])
    .config(function ($locationProvider, $httpProvider, $routeProvider, $mdThemingProvider, $translateProvider) {

      // Setting hash prefix
      $locationProvider.html5Mode(true);
      $locationProvider.hashPrefix('!');

      // Set up cache
      $httpProvider.defaults.cache = true;

      $httpProvider.interceptors.push('LoaderInterceptor');

      // Setting theme
      $mdThemingProvider.theme('default').primaryPalette('indigo');

      // Translates
      $translateProvider.translations('en', window.i18n.en);
      $translateProvider.translations('ru', window.i18n.ru);

      // Setting locale
      $translateProvider.preferredLanguage('en');

      // Routes config
      $routeProvider
        .otherwise({
          redirectTo: '/'
        });

    })
    .run(function (analytics) {
      analytics.init();
    });

}());
