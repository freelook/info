'use strict';
angular
  .module('freelook.info')
  .directive('fliPolyfill', function ($parse) {
    return function (scope, el) {
      var style = $parse('documentElement.style')(document) || {};
      if (angular.isUndefined(style.flex)) {
        $(el).addClass('polyfill');
      }
    };
  });
