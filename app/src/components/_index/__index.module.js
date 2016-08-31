(function () {
  'use strict';

  if (/(\?|%3F)l%3D/i.test(window.location.href)) {

    window.location.href = [
      window.location.origin,
      decodeURIComponent(window.location.pathname || ''),
      decodeURIComponent(window.location.search || '')
    ].join('');

  } else {

    window.i18n = {
      en: {},
      ru: {}
    };

    angular
      .module('freelook.info',
      ['fli.core', 'fli.uix', 'fli.views', 'fli.home', 'fli.search', 'fli.look', 'fli.show',
        'fli.feedback', 'fli.token', 'fli.promo', 'fli.profile', 'fli.wizard'])
      .config(function ($locationProvider, $httpProvider, $routeProvider, $mdThemingProvider, $translateProvider,
                        platformProvider) {

        // Setting hash prefix
        $locationProvider.html5Mode({enabled: !platformProvider.isChromeApp(), requireBase: false});
        $locationProvider.hashPrefix('!');

        // Set loader
        $httpProvider.interceptors.push('loaderInterceptor');

        // Setting theme
        $mdThemingProvider.definePalette('fli', {
          '50': 'ebebeb',
          '100': 'ebebeb',
          '200': 'ebebeb',
          '300': 'ebebeb',
          '400': 'ebebeb',
          '500': 'ebebeb',
          '600': 'ebebeb',
          '700': 'ebebeb',
          '800': 'ebebeb',
          '900': 'ebebeb',
          'A100': 'ebebeb',
          'A200': 'ebebeb',
          'A400': 'ebebeb',
          'A700': 'ebebeb',
          'contrastDefaultColor': 'dark'
        });

        $mdThemingProvider.theme('default')
          .primaryPalette('fli')
          .accentPalette('deep-purple')
          .warnPalette('pink')
          .backgroundPalette('fli');

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
      .run(function ($injector, $rootScope, cache, platform, splash, analytics, scroll, toast) {

        // Run app
        $rootScope.fli = {};

        splash.hide();
        cache.init();
        platform.init();
        analytics.init();

        $injector.get('io');

        // Route change handlers
        $rootScope.$on('$routeChangeStart', function () {
          toast.routeChangeSuccess();
          scroll.routeChangeSuccess();
          analytics.routeChangeSuccess();
        });

      });

  }

}());
