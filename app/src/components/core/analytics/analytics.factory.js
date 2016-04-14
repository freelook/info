'use strict';

angular
  .module('fli.core')
  .factory('analytics', function ($window, $rootScope, $location, metrica) {

    function init() {

      (function (i, s, o, g, r, a, m) {
        i.GoogleAnalyticsObject = r;
        i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments);
          };
        i[r].l = 1 * new Date();
        a = s.createElement(o);
        m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m);
      })($window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

      $window.ga('create', 'UA-57893328-1', 'auto');

      $rootScope.$on('$routeChangeSuccess', function () {
        if ($window.ga) {
          $window.ga('send', 'pageview', {page: decodeURIComponent($location.url())});
        }
        metrica.init();
      });
    }

    return {
      init: init
    };

  });


