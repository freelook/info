(function () {
  'use strict';

  window.i18n = {
    en: {},
    ru: {}
  };

  angular
    .module('freelook.info',
    ['fli.core', 'fli.uix', 'fli.views', 'fli.home', 'fli.search', 'fli.look', 'fli.show', 'fli.feedback', 'fli.token'])
    .config(function ($locationProvider, $httpProvider, $routeProvider, $mdThemingProvider, $translateProvider,
                      platformProvider) {

      // Setting hash prefix
      $locationProvider.html5Mode({enabled: !platformProvider.isChromeApp(), requireBase: false});
      $locationProvider.hashPrefix('!');

      // Set loader
      $httpProvider.interceptors.push('loaderInterceptor');

      // Setting theme
      $mdThemingProvider.theme('default').primaryPalette('indigo');

      // Translates
      $translateProvider.useSanitizeValueStrategy('escapeParameters');
      $translateProvider.translations('en', window.i18n.en);
      $translateProvider.translations('ru', window.i18n.ru);

      // Setting locale
      $translateProvider.preferredLanguage('en');

      // Routes config
      $routeProvider.otherwise({
        redirectTo: function () {
          return '/' + window.location.search;
        }
      });

    })
    .run(function ($rootScope, cache, platform, splash, analytics, scroll, io, user) {

      // Run app
      $rootScope.fli = {};

      cache.init();
      splash.hide();
      platform.init();
      analytics.init();
      scroll.init();
      user.init();

    });

}());
