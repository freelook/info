'use strict';
angular
  .module('freelook.info')
  .directive('fliHref', function ($rootScope, platform) {
    return function (scope, el, attrs) {

      var handlers = {
        site: function () {
          $(el).attr('href', attrs.fliHref);
        },
        chrome: function () {
          $(el).attr('href', attrs.fliHref).on('click', function () {
            $rootScope.go(attrs.fliHref);
          });
        }
      }, handler = handlers[platform.name()];

      function init() {
        handler();
      }

      attrs.$observe('fliHref', function () {
        init();
      });

    };
  });
